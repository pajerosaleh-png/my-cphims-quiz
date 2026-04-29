/*
 * CPHIMS Exam Prep — Quiz Context
 * Manages all quiz state: current question, answers, skipped questions,
 * review mode, timer, and results.
 */
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { questions, Question, Domain, QuestionType } from "@/data/questions";

export type QuizMode = "home" | "config" | "quiz" | "review" | "results";
export type AnswerState = "unanswered" | "correct" | "incorrect" | "skipped";

export interface QuestionStatus {
  questionId: number;
  selectedAnswer: string | null;
  state: AnswerState;
  timeSpent: number; // seconds
}

export interface QuizConfig {
  domains: Domain[];
  types: QuestionType[];
  questionCount: number;
  timedMode: boolean;
  timeLimitMinutes: number;
}

interface QuizContextValue {
  mode: QuizMode;
  config: QuizConfig;
  activeQuestions: Question[];
  currentIndex: number;
  statuses: Record<number, QuestionStatus>;
  skippedIds: number[];
  reviewQueue: number[]; // indices into activeQuestions
  isReviewMode: boolean;
  elapsed: number; // seconds
  timeLimit: number; // seconds (0 = no limit)

  // Actions
  setConfig: (c: QuizConfig) => void;
  startQuiz: () => void;
  selectAnswer: (questionId: number, answer: string) => void;
  skipQuestion: () => void;
  goToQuestion: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  enterReview: () => void;
  exitReview: () => void;
  finishQuiz: () => void;
  resetQuiz: () => void;

  // Derived
  score: number;
  totalAnswered: number;
  totalSkipped: number;
  totalCorrect: number;
  totalIncorrect: number;
  progressPercent: number;
}

const defaultConfig: QuizConfig = {
  domains: [
    "Healthcare and Technology Environments",
    "Clinical Informatics",
    "Healthcare Information and Systems Management",
    "Management and Leadership",
  ],
  types: ["Recall", "Application", "Scenario-Based Analysis"],
  questionCount: 100,
  timedMode: false,
  timeLimitMinutes: 120,
};

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<QuizMode>("home");
  const [config, setConfig] = useState<QuizConfig>(defaultConfig);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<Record<number, QuestionStatus>>({});
  const [skippedIds, setSkippedIds] = useState<number[]>([]);
  const [reviewQueue, setReviewQueue] = useState<number[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionStartRef = useRef<number>(Date.now());

  // Timer
  useEffect(() => {
    if (mode === "quiz") {
      timerRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode]);

  // Auto-finish when time runs out
  useEffect(() => {
    if (config.timedMode && elapsed >= config.timeLimitMinutes * 60 && mode === "quiz") {
      finishQuiz();
    }
  }, [elapsed, config.timedMode, config.timeLimitMinutes, mode]);

  const startQuiz = useCallback(() => {
    // Filter and shuffle questions based on config
    let filtered = questions.filter(
      (q) => config.domains.includes(q.domain) && config.types.includes(q.type)
    );
    // Shuffle
    filtered = [...filtered].sort(() => Math.random() - 0.5);
    // Limit count
    filtered = filtered.slice(0, Math.min(config.questionCount, filtered.length));

    setActiveQuestions(filtered);
    setCurrentIndex(0);
    setStatuses({});
    setSkippedIds([]);
    setReviewQueue([]);
    setIsReviewMode(false);
    setElapsed(0);
    questionStartRef.current = Date.now();
    setMode("quiz");
  }, [config]);

  const selectAnswer = useCallback((questionId: number, answer: string) => {
    setStatuses((prev) => {
      const q = activeQuestions.find((q) => q.id === questionId);
      if (!q) return prev;
      const isCorrect = answer === q.answer;
      const timeSpent = Math.round((Date.now() - questionStartRef.current) / 1000);
      return {
        ...prev,
        [questionId]: {
          questionId,
          selectedAnswer: answer,
          state: isCorrect ? "correct" : "incorrect",
          timeSpent,
        },
      };
    });
    // Remove from skipped if it was skipped
    setSkippedIds((prev) => prev.filter((id) => id !== questionId));
  }, [activeQuestions]);

  const skipQuestion = useCallback(() => {
    const q = activeQuestions[currentIndex];
    if (!q) return;
    const timeSpent = Math.round((Date.now() - questionStartRef.current) / 1000);
    setStatuses((prev) => ({
      ...prev,
      [q.id]: {
        questionId: q.id,
        selectedAnswer: null,
        state: "skipped",
        timeSpent,
      },
    }));
    setSkippedIds((prev) => prev.includes(q.id) ? prev : [...prev, q.id]);
    questionStartRef.current = Date.now();
    // Move to next
    setCurrentIndex((i) => Math.min(i + 1, activeQuestions.length - 1));
  }, [activeQuestions, currentIndex]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < activeQuestions.length) {
      questionStartRef.current = Date.now();
      setCurrentIndex(index);
    }
  }, [activeQuestions.length]);

  const goNext = useCallback(() => {
    questionStartRef.current = Date.now();
    setCurrentIndex((i) => Math.min(i + 1, activeQuestions.length - 1));
  }, [activeQuestions.length]);

  const goPrev = useCallback(() => {
    questionStartRef.current = Date.now();
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const enterReview = useCallback(() => {
    // Build review queue: indices of skipped questions
    const queue = activeQuestions
      .map((q, i) => ({ q, i }))
      .filter(({ q }) => skippedIds.includes(q.id))
      .map(({ i }) => i);
    setReviewQueue(queue);
    if (queue.length > 0) {
      setCurrentIndex(queue[0]);
    }
    setIsReviewMode(true);
  }, [activeQuestions, skippedIds]);

  const exitReview = useCallback(() => {
    setIsReviewMode(false);
    setReviewQueue([]);
  }, []);

  const finishQuiz = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMode("results");
  }, []);

  const resetQuiz = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMode("home");
    setActiveQuestions([]);
    setCurrentIndex(0);
    setStatuses({});
    setSkippedIds([]);
    setReviewQueue([]);
    setIsReviewMode(false);
    setElapsed(0);
  }, []);

  // Derived values
  const statusList = Object.values(statuses);
  const totalAnswered = statusList.filter((s) => s.state !== "unanswered" && s.state !== "skipped").length;
  const totalSkipped = skippedIds.length;
  const totalCorrect = statusList.filter((s) => s.state === "correct").length;
  const totalIncorrect = statusList.filter((s) => s.state === "incorrect").length;
  const score = activeQuestions.length > 0 ? Math.round((totalCorrect / activeQuestions.length) * 100) : 0;
  const progressPercent = activeQuestions.length > 0
    ? Math.round(((totalAnswered + totalSkipped) / activeQuestions.length) * 100)
    : 0;
  const timeLimit = config.timedMode ? config.timeLimitMinutes * 60 : 0;

  return (
    <QuizContext.Provider
      value={{
        mode,
        config,
        activeQuestions,
        currentIndex,
        statuses,
        skippedIds,
        reviewQueue,
        isReviewMode,
        elapsed,
        timeLimit,
        setConfig,
        startQuiz,
        selectAnswer,
        skipQuestion,
        goToQuestion,
        goNext,
        goPrev,
        enterReview,
        exitReview,
        finishQuiz,
        resetQuiz,
        score,
        totalAnswered,
        totalSkipped,
        totalCorrect,
        totalIncorrect,
        progressPercent,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
