/*
 * CPHIMS Exam Prep — Quiz Page
 * Design: Dark mode, command center layout
 * Features: Question display, answer selection, skip, prev/next, review mode
 */
import { useState, useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft, ChevronRight, SkipForward, BookmarkCheck,
  Clock, CheckCircle2, XCircle, AlertCircle, Flag,
  BarChart3, ArrowLeft, Eye, EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

const domainColors: Record<string, { bg: string; text: string; border: string }> = {
  "Healthcare and Technology Environments": {
    bg: "oklch(0.62 0.22 264 / 15%)",
    text: "oklch(0.78 0.12 264)",
    border: "oklch(0.62 0.22 264 / 40%)",
  },
  "Clinical Informatics": {
    bg: "oklch(0.65 0.18 160 / 15%)",
    text: "oklch(0.78 0.12 160)",
    border: "oklch(0.65 0.18 160 / 40%)",
  },
  "Healthcare Information and Systems Management": {
    bg: "oklch(0.65 0.18 40 / 15%)",
    text: "oklch(0.78 0.12 40)",
    border: "oklch(0.65 0.18 40 / 40%)",
  },
  "Management and Leadership": {
    bg: "oklch(0.55 0.18 220 / 15%)",
    text: "oklch(0.78 0.12 220)",
    border: "oklch(0.55 0.18 220 / 40%)",
  },
};

const typeColors: Record<string, { bg: string; text: string }> = {
  "Recall": { bg: "oklch(0.62 0.22 264 / 12%)", text: "oklch(0.72 0.12 264)" },
  "Application": { bg: "oklch(0.55 0.18 220 / 12%)", text: "oklch(0.72 0.12 220)" },
  "Scenario-Based Analysis": { bg: "oklch(0.65 0.18 40 / 12%)", text: "oklch(0.72 0.12 40)" },
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function QuizPage() {
  const {
    activeQuestions, currentIndex, statuses, skippedIds,
    isReviewMode, reviewQueue, elapsed, timeLimit,
    selectAnswer, skipQuestion, goToQuestion, goNext, goPrev,
    enterReview, exitReview, finishQuiz, resetQuiz,
    totalAnswered, totalSkipped, totalCorrect, progressPercent,
    config,
  } = useQuiz();

  const [showExplanation, setShowExplanation] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState<string | null>(null);
  const [answerAnimClass, setAnswerAnimClass] = useState("");

  const question = activeQuestions[currentIndex];
  const status = question ? statuses[question.id] : undefined;
  const isAnswered = status && (status.state === "correct" || status.state === "incorrect");
  const isSkipped = status?.state === "skipped";

  // Reset local state when question changes
  useEffect(() => {
    setShowExplanation(false);
    setAnimKey((k) => k + 1);
    setSelectedLocal(null);
    setAnswerAnimClass("");
  }, [currentIndex]);

  // Sync selectedLocal with existing status
  useEffect(() => {
    if (status?.selectedAnswer) {
      setSelectedLocal(status.selectedAnswer);
    }
  }, [status]);

  const handleSelectAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedLocal(option);
    const isCorrect = option === question.answer;
    setAnswerAnimClass(isCorrect ? "animate-correct" : "animate-shake");
    setTimeout(() => setAnswerAnimClass(""), 600);
    selectAnswer(question.id, option);
    setTimeout(() => setShowExplanation(true), 400);
  };

  const handleSkip = () => {
    if (isAnswered) return;
    skipQuestion();
  };

  const handleNext = () => {
    if (isReviewMode) {
      const currentReviewPos = reviewQueue.indexOf(currentIndex);
      if (currentReviewPos < reviewQueue.length - 1) {
        goToQuestion(reviewQueue[currentReviewPos + 1]);
      } else {
        exitReview();
      }
    } else {
      goNext();
    }
  };

  const handlePrev = () => {
    if (isReviewMode) {
      const currentReviewPos = reviewQueue.indexOf(currentIndex);
      if (currentReviewPos > 0) {
        goToQuestion(reviewQueue[currentReviewPos - 1]);
      }
    } else {
      goPrev();
    }
  };

  const timeRemaining = timeLimit > 0 ? Math.max(0, timeLimit - elapsed) : null;
  const isLowTime = timeRemaining !== null && timeRemaining < 300;

  if (!question) return null;

  const domainColor = domainColors[question.domain] || domainColors["Healthcare and Technology Environments"];
  const typeColor = typeColors[question.type] || typeColors["Recall"];

  const getOptionClass = (option: string) => {
    if (!isAnswered && !isSkipped) {
      return selectedLocal === option ? "answer-option answer-option--selected" : "answer-option";
    }
    if (option === question.answer) return "answer-option answer-option--correct answer-option--disabled";
    if (option === status?.selectedAnswer && option !== question.answer)
      return "answer-option answer-option--incorrect answer-option--disabled";
    return "answer-option answer-option--disabled";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-white/8 sticky top-0 z-50 backdrop-blur-sm"
        style={{ background: "oklch(0.13 0.02 264 / 95%)" }}>
        <div className="container h-14 flex items-center gap-4">
          <button
            onClick={resetQuiz}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>

          <div className="flex-1 flex items-center gap-3">
            {/* Progress bar */}
            <div className="flex-1 progress-track max-w-xs">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {totalAnswered + totalSkipped}/{activeQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Stats */}
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1" style={{ color: "oklch(0.65 0.18 160)" }}>
                <CheckCircle2 className="w-3.5 h-3.5" /> {totalCorrect}
              </span>
              <span className="flex items-center gap-1" style={{ color: "oklch(0.65 0.22 25)" }}>
                <XCircle className="w-3.5 h-3.5" /> {totalAnswered - totalCorrect}
              </span>
              {totalSkipped > 0 && (
                <span className="flex items-center gap-1" style={{ color: "oklch(0.65 0.15 60)" }}>
                  <AlertCircle className="w-3.5 h-3.5" /> {totalSkipped} skipped
                </span>
              )}
            </div>

            {/* Timer */}
            {timeRemaining !== null && (
              <div className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium",
                isLowTime ? "text-red-400 bg-red-500/10" : "text-muted-foreground"
              )}>
                <Clock className="w-3.5 h-3.5" />
                {formatTime(timeRemaining)}
              </div>
            )}

            {/* Review skipped */}
            {totalSkipped > 0 && !isReviewMode && (
              <Button
                size="sm"
                variant="outline"
                onClick={enterReview}
                className="h-8 text-xs gap-1.5 hidden sm:flex"
                style={{ borderColor: "oklch(0.65 0.15 60 / 40%)", color: "oklch(0.72 0.12 60)" }}
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                Review {totalSkipped}
              </Button>
            )}

            {/* Question nav toggle */}
            <button
              onClick={() => setShowNav(!showNav)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: showNav ? "oklch(0.62 0.22 264 / 20%)" : "oklch(1 0 0 / 5%)" }}
            >
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Review mode banner */}
        {isReviewMode && (
          <div className="border-t border-white/8 py-2 px-4 flex items-center justify-between"
            style={{ background: "oklch(0.65 0.15 60 / 10%)" }}>
            <span className="text-xs font-medium" style={{ color: "oklch(0.72 0.12 60)" }}>
              <BookmarkCheck className="w-3.5 h-3.5 inline mr-1" />
              Review Mode — {reviewQueue.length} skipped question{reviewQueue.length !== 1 ? "s" : ""}
            </span>
            <button onClick={exitReview} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Exit Review
            </button>
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Question Nav Panel */}
        {showNav && (
          <aside className="w-64 border-r border-white/8 overflow-y-auto p-4 hidden lg:block animate-slide-right"
            style={{ background: "oklch(0.15 0.025 264)" }}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Questions
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {activeQuestions.map((q, i) => {
                const s = statuses[q.id];
                const isCurrent = i === currentIndex;
                let bg = "oklch(1 0 0 / 5%)";
                let border = "oklch(1 0 0 / 10%)";
                let textColor = "oklch(0.6 0.01 264)";
                if (isCurrent) { bg = "oklch(0.62 0.22 264 / 30%)"; border = "oklch(0.62 0.22 264)"; textColor = "white"; }
                else if (s?.state === "correct") { bg = "oklch(0.65 0.18 160 / 15%)"; border = "oklch(0.65 0.18 160 / 50%)"; textColor = "oklch(0.72 0.12 160)"; }
                else if (s?.state === "incorrect") { bg = "oklch(0.65 0.22 25 / 15%)"; border = "oklch(0.65 0.22 25 / 50%)"; textColor = "oklch(0.72 0.12 25)"; }
                else if (s?.state === "skipped") { bg = "oklch(0.65 0.15 60 / 15%)"; border = "oklch(0.65 0.15 60 / 50%)"; textColor = "oklch(0.72 0.12 60)"; }
                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(i)}
                    className="w-full aspect-square rounded-lg text-xs font-medium transition-all duration-150 hover:scale-105"
                    style={{ background: bg, border: `1px solid ${border}`, color: textColor }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "oklch(0.65 0.18 160 / 40%)", border: "1px solid oklch(0.65 0.18 160 / 60%)" }} />
                <span className="text-muted-foreground">Correct</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "oklch(0.65 0.22 25 / 40%)", border: "1px solid oklch(0.65 0.22 25 / 60%)" }} />
                <span className="text-muted-foreground">Incorrect</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "oklch(0.65 0.15 60 / 40%)", border: "1px solid oklch(0.65 0.15 60 / 60%)" }} />
                <span className="text-muted-foreground">Skipped</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: "oklch(0.62 0.22 264 / 30%)", border: "1px solid oklch(0.62 0.22 264)" }} />
                <span className="text-muted-foreground">Current</span>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Question header */}
            <div key={animKey} className="animate-fade-in-up">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-sm font-mono text-muted-foreground">
                  Q{currentIndex + 1} / {activeQuestions.length}
                </span>
                <span className="domain-badge text-xs"
                  style={{ background: domainColor.bg, color: domainColor.text, border: `1px solid ${domainColor.border}` }}>
                  {question.domain}
                </span>
                <span className="domain-badge text-xs"
                  style={{ background: typeColor.bg, color: typeColor.text, border: "none" }}>
                  {question.type}
                </span>
                {isSkipped && (
                  <span className="domain-badge text-xs"
                    style={{ background: "oklch(0.65 0.15 60 / 15%)", color: "oklch(0.72 0.12 60)", border: "1px solid oklch(0.65 0.15 60 / 40%)" }}>
                    <Flag className="w-3 h-3 mr-1 inline" /> Skipped
                  </span>
                )}
              </div>

              {/* Question text */}
              <div className="glass-card rounded-2xl p-6 mb-6">
                <p className="text-base sm:text-lg leading-relaxed font-medium">
                  {question.question}
                </p>
              </div>

              {/* Answer options */}
              <div className={cn("space-y-3 mb-6", answerAnimClass)}>
                {question.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelectAnswer(option)}
                      className={getOptionClass(option)}
                      disabled={isAnswered || isSkipped}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{ background: "oklch(1 0 0 / 8%)" }}>
                          {letter}
                        </span>
                        <span className="text-sm leading-relaxed">{option}</span>
                        {isAnswered && option === question.answer && (
                          <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.18 160)" }} />
                        )}
                        {isAnswered && option === status?.selectedAnswer && option !== question.answer && (
                          <XCircle className="w-4 h-4 ml-auto flex-shrink-0 mt-0.5" style={{ color: "oklch(0.65 0.22 25)" }} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div className="mb-6 animate-fade-in">
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex items-center gap-2 text-sm font-medium mb-3 transition-colors"
                    style={{ color: "oklch(0.72 0.12 264)" }}
                  >
                    {showExplanation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showExplanation ? "Hide" : "Show"} Explanation
                  </button>
                  {showExplanation && (
                    <div className="rounded-xl p-4 text-sm leading-relaxed animate-fade-in-up"
                      style={{ background: "oklch(0.62 0.22 264 / 8%)", border: "1px solid oklch(0.62 0.22 264 / 20%)", color: "oklch(0.82 0.04 264)" }}>
                      <p className="font-semibold text-xs uppercase tracking-wider mb-2" style={{ color: "oklch(0.72 0.12 264)" }}>
                        Explanation
                      </p>
                      {question.explanation}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="gap-2 h-10"
                  style={{ borderColor: "oklch(1 0 0 / 12%)", background: "oklch(1 0 0 / 4%)" }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {!isAnswered && !isSkipped && (
                    <Button
                      variant="outline"
                      onClick={handleSkip}
                      className="gap-2 h-10"
                      style={{ borderColor: "oklch(0.65 0.15 60 / 40%)", color: "oklch(0.72 0.12 60)", background: "oklch(0.65 0.15 60 / 8%)" }}
                    >
                      <SkipForward className="w-4 h-4" />
                      Skip
                    </Button>
                  )}

                  {currentIndex === activeQuestions.length - 1 ? (
                    <Button
                      onClick={finishQuiz}
                      className="gap-2 h-10 font-semibold"
                      style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 264), oklch(0.55 0.18 220))", border: "none" }}
                    >
                      Finish Exam
                      <Flag className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="gap-2 h-10"
                      style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 264), oklch(0.55 0.18 220))", border: "none" }}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Review skipped (mobile) */}
              {totalSkipped > 0 && !isReviewMode && (
                <div className="mt-4 sm:hidden">
                  <Button
                    variant="outline"
                    onClick={enterReview}
                    className="w-full gap-2 h-10 text-sm"
                    style={{ borderColor: "oklch(0.65 0.15 60 / 40%)", color: "oklch(0.72 0.12 60)" }}
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    Review {totalSkipped} Skipped Question{totalSkipped !== 1 ? "s" : ""}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
