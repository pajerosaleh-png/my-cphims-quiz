/*
 * CPHIMS Exam Prep — Results Page
 * Design: Dark mode, command center, score visualization
 */
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, XCircle, AlertCircle, RotateCcw,
  Trophy, Clock, Target, TrendingUp, BookOpen
} from "lucide-react";
import { useState } from "react";

const domainColors: Record<string, { bg: string; text: string; bar: string }> = {
  "Healthcare and Technology Environments": {
    bg: "oklch(0.62 0.22 264 / 12%)",
    text: "oklch(0.78 0.12 264)",
    bar: "oklch(0.62 0.22 264)",
  },
  "Clinical Informatics": {
    bg: "oklch(0.65 0.18 160 / 12%)",
    text: "oklch(0.78 0.12 160)",
    bar: "oklch(0.65 0.18 160)",
  },
  "Healthcare Information and Systems Management": {
    bg: "oklch(0.65 0.18 40 / 12%)",
    text: "oklch(0.78 0.12 40)",
    bar: "oklch(0.65 0.18 40)",
  },
  "Management and Leadership": {
    bg: "oklch(0.55 0.18 220 / 12%)",
    text: "oklch(0.78 0.12 220)",
    bar: "oklch(0.55 0.18 220)",
  },
};

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

export default function ResultsPage() {
  const {
    activeQuestions, statuses, elapsed,
    totalCorrect, totalIncorrect, totalSkipped, score,
    resetQuiz, startQuiz,
  } = useQuiz();

  const [showReview, setShowReview] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<"all" | "correct" | "incorrect" | "skipped">("all");

  const passed = score >= 75; // CPHIMS passing is ~75%

  // Domain breakdown
  const domainStats = Object.entries(
    activeQuestions.reduce((acc, q) => {
      if (!acc[q.domain]) acc[q.domain] = { total: 0, correct: 0 };
      acc[q.domain].total++;
      if (statuses[q.id]?.state === "correct") acc[q.domain].correct++;
      return acc;
    }, {} as Record<string, { total: number; correct: number }>)
  );

  // Type breakdown
  const typeStats = Object.entries(
    activeQuestions.reduce((acc, q) => {
      if (!acc[q.type]) acc[q.type] = { total: 0, correct: 0 };
      acc[q.type].total++;
      if (statuses[q.id]?.state === "correct") acc[q.type].correct++;
      return acc;
    }, {} as Record<string, { total: number; correct: number }>)
  );

  const filteredQuestions = activeQuestions.filter((q) => {
    const s = statuses[q.id];
    if (reviewFilter === "all") return true;
    if (reviewFilter === "correct") return s?.state === "correct";
    if (reviewFilter === "incorrect") return s?.state === "incorrect";
    if (reviewFilter === "skipped") return s?.state === "skipped" || !s;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${passed ? "oklch(0.65 0.18 160)" : "oklch(0.65 0.22 25)"}, transparent 70%)` }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12">
        {/* Score Hero */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{
              background: passed ? "oklch(0.65 0.18 160 / 20%)" : "oklch(0.65 0.22 25 / 20%)",
              border: `2px solid ${passed ? "oklch(0.65 0.18 160 / 50%)" : "oklch(0.65 0.22 25 / 50%)"}`,
            }}>
            <Trophy className="w-9 h-9" style={{ color: passed ? "oklch(0.72 0.15 160)" : "oklch(0.72 0.15 25)" }} />
          </div>
          <h1 className="text-5xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {score}%
          </h1>
          <p className="text-lg font-medium mb-1" style={{ color: passed ? "oklch(0.72 0.15 160)" : "oklch(0.72 0.15 25)" }}>
            {passed ? "Excellent Work!" : "Keep Practicing"}
          </p>
          <p className="text-sm text-muted-foreground">
            {passed
              ? "You're on track for the CPHIMS exam. Review any missed questions to solidify your knowledge."
              : "Focus on the domains where you scored below 70% and review the explanations for missed questions."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          {[
            { icon: CheckCircle2, label: "Correct", value: totalCorrect, color: "oklch(0.65 0.18 160)", bg: "oklch(0.65 0.18 160 / 12%)" },
            { icon: XCircle, label: "Incorrect", value: totalIncorrect, color: "oklch(0.65 0.22 25)", bg: "oklch(0.65 0.22 25 / 12%)" },
            { icon: AlertCircle, label: "Skipped", value: totalSkipped, color: "oklch(0.65 0.15 60)", bg: "oklch(0.65 0.15 60 / 12%)" },
            { icon: Clock, label: "Time", value: formatTime(elapsed), color: "oklch(0.62 0.22 264)", bg: "oklch(0.62 0.22 264 / 12%)" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-4 text-center"
              style={{ background: stat.bg }}>
              <stat.icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
              <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Domain Breakdown */}
        <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Target className="w-4 h-4 text-indigo-400" />
            Performance by Domain
          </h2>
          <div className="space-y-4">
            {domainStats.map(([domain, stats]) => {
              const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              const dc = domainColors[domain] || domainColors["Healthcare and Technology Environments"];
              return (
                <div key={domain}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium" style={{ color: dc.text }}>
                      {domain}
                    </span>
                    <span className="text-xs font-bold" style={{ color: dc.text }}>
                      {stats.correct}/{stats.total} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "oklch(1 0 0 / 8%)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: dc.bar }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Type Breakdown */}
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <h2 className="text-base font-semibold mb-5 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <TrendingUp className="w-4 h-4 text-sky-400" />
            Performance by Question Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {typeStats.map(([type, stats]) => {
              const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              return (
                <div key={type} className="rounded-xl p-4 text-center"
                  style={{ background: "oklch(1 0 0 / 4%)", border: "1px solid oklch(1 0 0 / 8%)" }}>
                  <div className="text-2xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {pct}%
                  </div>
                  <div className="text-xs font-medium text-foreground mb-0.5">{type}</div>
                  <div className="text-xs text-muted-foreground">{stats.correct}/{stats.total} correct</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <Button
            onClick={startQuiz}
            className="flex-1 h-11 gap-2 font-semibold"
            style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 264), oklch(0.55 0.18 220))", border: "none" }}
          >
            <RotateCcw className="w-4 h-4" />
            Retake Exam
          </Button>
          <Button
            variant="outline"
            onClick={resetQuiz}
            className="flex-1 h-11 gap-2"
            style={{ borderColor: "oklch(1 0 0 / 15%)", background: "oklch(1 0 0 / 5%)" }}
          >
            Back to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowReview(!showReview)}
            className="flex-1 h-11 gap-2"
            style={{ borderColor: "oklch(1 0 0 / 15%)", background: "oklch(1 0 0 / 5%)" }}
          >
            <BookOpen className="w-4 h-4" />
            {showReview ? "Hide" : "Review"} Questions
          </Button>
        </div>

        {/* Question Review */}
        {showReview && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {(["all", "correct", "incorrect", "skipped"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setReviewFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all"
                  style={{
                    background: reviewFilter === f ? "oklch(0.62 0.22 264 / 30%)" : "oklch(1 0 0 / 5%)",
                    border: `1px solid ${reviewFilter === f ? "oklch(0.62 0.22 264)" : "oklch(1 0 0 / 12%)"}`,
                    color: reviewFilter === f ? "oklch(0.85 0.08 264)" : "oklch(0.6 0.01 264)",
                  }}
                >
                  {f} ({f === "all" ? activeQuestions.length
                    : f === "correct" ? totalCorrect
                    : f === "incorrect" ? totalIncorrect
                    : totalSkipped})
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredQuestions.map((q, i) => {
                const s = statuses[q.id];
                const state = s?.state || "skipped";
                const stateColor = state === "correct" ? "oklch(0.65 0.18 160)" : state === "incorrect" ? "oklch(0.65 0.22 25)" : "oklch(0.65 0.15 60)";
                const stateBg = state === "correct" ? "oklch(0.65 0.18 160 / 8%)" : state === "incorrect" ? "oklch(0.65 0.22 25 / 8%)" : "oklch(0.65 0.15 60 / 8%)";
                const StateIcon = state === "correct" ? CheckCircle2 : state === "incorrect" ? XCircle : AlertCircle;

                return (
                  <div key={q.id} className="rounded-2xl p-5 border"
                    style={{ background: stateBg, borderColor: `${stateColor}30` }}>
                    <div className="flex items-start gap-3 mb-3">
                      <StateIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: stateColor }} />
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-xs text-muted-foreground">Q{activeQuestions.indexOf(q) + 1}</span>
                          <span className="text-xs font-medium" style={{ color: stateColor }}>{q.type}</span>
                          <span className="text-xs text-muted-foreground">{q.domain}</span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed mb-3">{q.question}</p>
                        <div className="space-y-1.5">
                          {q.options.map((opt, oi) => {
                            const letter = String.fromCharCode(65 + oi);
                            const isCorrect = opt === q.answer;
                            const isSelected = s?.selectedAnswer === opt;
                            return (
                              <div key={opt}
                                className="flex items-start gap-2 text-xs p-2 rounded-lg"
                                style={{
                                  background: isCorrect ? "oklch(0.65 0.18 160 / 12%)" : isSelected && !isCorrect ? "oklch(0.65 0.22 25 / 12%)" : "transparent",
                                  border: `1px solid ${isCorrect ? "oklch(0.65 0.18 160 / 30%)" : isSelected && !isCorrect ? "oklch(0.65 0.22 25 / 30%)" : "transparent"}`,
                                }}>
                                <span className="font-mono font-bold flex-shrink-0" style={{ color: isCorrect ? "oklch(0.72 0.12 160)" : "oklch(0.5 0.01 264)" }}>
                                  {letter}.
                                </span>
                                <span style={{ color: isCorrect ? "oklch(0.85 0.08 160)" : "oklch(0.7 0.01 264)" }}>
                                  {opt}
                                  {isCorrect && " ✓"}
                                  {isSelected && !isCorrect && " ✗"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-3 p-3 rounded-lg text-xs leading-relaxed"
                          style={{ background: "oklch(0.62 0.22 264 / 8%)", border: "1px solid oklch(0.62 0.22 264 / 15%)", color: "oklch(0.75 0.04 264)" }}>
                          <span className="font-semibold text-indigo-400">Explanation: </span>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
