/*
 * CPHIMS Exam Prep — App Root
 * Design: Dark mode, Healthcare IT Command Center
 * Routes: Mode-based routing (home → quiz → results)
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QuizProvider, useQuiz } from "./contexts/QuizContext";
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

function AppRouter() {
  const { mode } = useQuiz();

  if (mode === "quiz" || mode === "review") return <QuizPage />;
  if (mode === "results") return <ResultsPage />;
  return <Home />;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <QuizProvider>
          <Toaster />
          <AppRouter />
        </QuizProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
