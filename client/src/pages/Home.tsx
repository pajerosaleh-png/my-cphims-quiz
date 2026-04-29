/*
 * CPHIMS Exam Prep — Home Page
 * Design: Dark mode, indigo/sky-blue palette, glassmorphism
 * Layout: Centered hero with feature cards and domain overview
 */
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Brain, Target, Clock, ChevronRight,
  Activity, Shield, Users, Stethoscope, Award
} from "lucide-react";

const domainCards = [
  {
    icon: Activity,
    name: "Healthcare & Technology Environments",
    questions: 25,
    color: "from-indigo-500/20 to-indigo-600/10",
    border: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    badge: "25%",
  },
  {
    icon: Stethoscope,
    name: "Clinical Informatics",
    questions: 20,
    color: "from-teal-500/20 to-teal-600/10",
    border: "border-teal-500/30",
    iconColor: "text-teal-400",
    badge: "20%",
  },
  {
    icon: Shield,
    name: "Healthcare Information & Systems Management",
    questions: 30,
    color: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
    badge: "30%",
  },
  {
    icon: Users,
    name: "Management & Leadership",
    questions: 25,
    color: "from-sky-500/20 to-sky-600/10",
    border: "border-sky-500/30",
    iconColor: "text-sky-400",
    badge: "25%",
  },
];

const features = [
  {
    icon: Brain,
    title: "3 Question Types",
    desc: "Recall, Application & Scenario-Based Analysis questions mirror the real CPHIMS exam.",
  },
  {
    icon: Target,
    title: "Skip & Review",
    desc: "Skip difficult questions and return to them in a dedicated Review Later session.",
  },
  {
    icon: Clock,
    title: "Timed Mode",
    desc: "Practice under exam conditions with a 2-hour countdown timer.",
  },
  {
    icon: BookOpen,
    title: "Detailed Explanations",
    desc: "Every answer includes a thorough explanation to reinforce your understanding.",
  },
];

export default function Home() {
  const { setConfig, startQuiz, config } = useQuiz();

  const handleStartFull = () => {
    setConfig({ ...config, questionCount: 100 });
    startQuiz();
  };

  const handleQuickPractice = () => {
    setConfig({ ...config, questionCount: 25 });
    startQuiz();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.22 264), transparent 70%)" }} />
        <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.18 220), transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, oklch(0.65 0.18 160), transparent 70%)" }} />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/8 backdrop-blur-sm sticky top-0 z-50"
          style={{ background: "oklch(0.13 0.02 264 / 90%)" }}>
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 264), oklch(0.55 0.18 220))" }}>
                <Award className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                CPHIMS Prep
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">100 Questions</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">4 Domains</span>
              <span className="hidden sm:inline">·</span>
              <span>3 Question Types</span>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="container pt-20 pb-16 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: "oklch(0.62 0.22 264 / 15%)", border: "1px solid oklch(0.62 0.22 264 / 30%)", color: "oklch(0.78 0.12 264)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            HIMSS CPHIMS Certification Preparation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Master the{" "}
            <span style={{
              background: "linear-gradient(135deg, oklch(0.72 0.18 264), oklch(0.65 0.18 220))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              CPHIMS Exam
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            100 expertly crafted questions across all four CPHIMS domains. Practice Recall,
            Application, and Scenario-Based Analysis questions with detailed explanations
            and a smart Skip & Review system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleStartFull}
              className="h-12 px-8 text-base font-semibold gap-2"
              style={{
                background: "linear-gradient(135deg, oklch(0.62 0.22 264), oklch(0.55 0.18 220))",
                border: "none",
              }}
            >
              Start Full Exam (100 Q)
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleQuickPractice}
              className="h-12 px-8 text-base font-semibold gap-2"
              style={{ borderColor: "oklch(1 0 0 / 15%)", background: "oklch(1 0 0 / 5%)" }}
            >
              Quick Practice (25 Q)
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="container pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card rounded-2xl p-5 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.62 0.22 264 / 15%)" }}>
                  <f.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Domains */}
        <section className="container pb-20">
          <h2 className="text-2xl font-bold mb-2 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Exam Domains
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Questions are distributed across all four CPHIMS content areas per the official exam blueprint.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domainCards.map((d, i) => (
              <div
                key={d.name}
                className={`rounded-2xl p-5 border bg-gradient-to-br ${d.color} ${d.border} animate-fade-in-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "oklch(1 0 0 / 8%)" }}>
                    <d.icon className={`w-5 h-5 ${d.iconColor}`} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: "oklch(1 0 0 / 10%)", color: "oklch(0.85 0.05 264)" }}>
                    {d.badge} of exam
                  </span>
                </div>
                <h3 className="font-semibold text-sm leading-snug mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {d.name}
                </h3>
                <p className="text-xs text-muted-foreground">{d.questions} questions</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/8 py-6">
          <div className="container text-center text-xs text-muted-foreground">
            CPHIMS Exam Prep · For study purposes only · Not affiliated with HIMSS
          </div>
        </footer>
      </div>
    </div>
  );
}
