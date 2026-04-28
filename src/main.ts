import './style.css'
import quizData from './cphims_questions.json'

interface Question {
  id: number
  domain: string
  question: string
  options: string[]
  answer: string
  explanation: string
}

interface QuizState {
  mode: 'menu' | 'quiz' | 'results'
  testType: 'practice' | 'timed' | 'fullexam' | 'mixed' | null
  currentQuestion: number
  score: number
  answered: boolean
  selectedAnswer: string | null
  showExplanation: boolean
  quizComplete: boolean
  answers: { questionId: number; selected: string; correct: string }[]
  timeRemaining: number
  timerInterval: number | null
  totalTime: number
  questions: Question[]
  showTimeWarning: boolean
}

const questions: Question[] = quizData

const state: QuizState = {
  mode: 'menu',
  testType: null,
  currentQuestion: 0,
  score: 0,
  answered: false,
  selectedAnswer: null,
  showExplanation: false,
  quizComplete: false,
  answers: [],
  timeRemaining: 0,
  timerInterval: null,
  totalTime: 0,
  questions: [],
  showTimeWarning: false
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function startQuiz(testType: 'practice' | 'timed' | 'fullexam' | 'mixed') {
  state.testType = testType
  state.mode = 'quiz'
  state.currentQuestion = 0
  state.score = 0
  state.answered = false
  state.selectedAnswer = null
  state.showExplanation = false
  state.quizComplete = false
  state.answers = []
  state.showTimeWarning = false

  // Set up questions based on test type
  if (testType === 'mixed') {
    state.questions = shuffleArray(questions)
  } else {
    state.questions = [...questions]
  }

  // Set up timer for timed and fullexam modes
  if (testType === 'timed' || testType === 'fullexam') {
    state.totalTime = 120 * 60 // 120 minutes in seconds
    state.timeRemaining = state.totalTime
    startTimer()
  }

  renderQuiz()
}

function startTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval)

  state.timerInterval = window.setInterval(() => {
    state.timeRemaining--

    // Warning at 5 minutes
    if (state.timeRemaining === 5 * 60) {
      state.showTimeWarning = true
    }

    // Auto-complete if time runs out
    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval!)
      state.quizComplete = true
      state.mode = 'results'
      renderQuiz()
      return
    }

    renderQuiz()
  }, 1000)
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

function renderMenu() {
  const app = document.querySelector<HTMLDivElement>('#app')!

  app.innerHTML = `
    <div class="quiz-container">
      <div class="menu-container">
        <h1>CPHIMS Self-Assessment Quiz</h1>
        <p class="menu-subtitle">Choose your test mode</p>

        <div class="menu-buttons">
          <button class="menu-btn" onclick="startQuiz('practice')">
            <div class="menu-btn-title">📚 Practice Mode</div>
            <div class="menu-btn-desc">No timer, learn at your own pace</div>
          </button>

          <button class="menu-btn" onclick="startQuiz('timed')">
            <div class="menu-btn-title">⏱️ Timed Mode</div>
            <div class="menu-btn-desc">120 minutes, all 100 questions</div>
          </button>

          <button class="menu-btn" onclick="startQuiz('fullexam')">
            <div class="menu-btn-title">📋 Full Exam</div>
            <div class="menu-btn-desc">120 minutes, official format</div>
          </button>

          <button class="menu-btn" onclick="startQuiz('mixed')">
            <div class="menu-btn-title">🔀 Mixed Mode</div>
            <div class="menu-btn-desc">Random order questions</div>
          </button>
        </div>

        <div class="menu-info">
          <p><strong>Total Questions:</strong> 100</p>
          <p><strong>Passing Score:</strong> 70%</p>
          <p><strong>Domains Covered:</strong> 9 CPHIMS domains</p>
        </div>
      </div>
    </div>
  `
}

function renderQuiz() {
  const app = document.querySelector<HTMLDivElement>('#app')!

  if (state.quizComplete) {
    renderResults(app)
    return
  }

  const question = state.questions[state.currentQuestion]
  const progress = ((state.currentQuestion + 1) / state.questions.length) * 100

  let timerHTML = ''
  if (state.testType === 'timed' || state.testType === 'fullexam') {
    const timerClass = state.timeRemaining < 5 * 60 ? 'timer-warning' : ''
    timerHTML = `
      <div class="timer-container ${timerClass}">
        <span class="timer-label">Time Remaining:</span>
        <span class="timer-display">${formatTime(state.timeRemaining)}</span>
      </div>
    `
    if (state.showTimeWarning && state.timeRemaining < 5 * 60) {
      timerHTML += `
        <div class="time-warning">
          ⚠️ Less than 5 minutes remaining!
        </div>
      `
    }
  }

  app.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header">
        <h1>CPHIMS Self-Assessment Quiz</h1>
        <div class="quiz-mode-badge">${state.testType === 'practice' ? '📚 Practice' : state.testType === 'timed' ? '⏱️ Timed' : state.testType === 'fullexam' ? '📋 Full Exam' : '🔀 Mixed'}</div>
        ${timerHTML}
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <p class="progress-text">Question ${state.currentQuestion + 1} of ${state.questions.length}</p>
      </div>

      <div class="quiz-content">
        <div class="domain-badge">${question.domain}</div>
        <h2>${question.question}</h2>

        <div class="options">
          ${question.options
            .map(
              (option, index) => `
            <button 
              class="option-btn ${state.selectedAnswer === option ? 'selected' : ''} ${
                state.answered && option === question.answer ? 'correct' : ''
              } ${state.answered && state.selectedAnswer === option && option !== question.answer ? 'incorrect' : ''}"
              onclick="selectAnswer('${option.replace(/'/g, "\\'")}')"
              ${state.answered ? 'disabled' : ''}
            >
              <span class="option-letter">${String.fromCharCode(65 + index)}</span>
              <span class="option-text">${option}</span>
              ${state.answered && option === question.answer ? '<span class="checkmark">✓</span>' : ''}
              ${state.answered && state.selectedAnswer === option && option !== question.answer ? '<span class="xmark">✗</span>' : ''}
            </button>
          `
            )
            .join('')}
        </div>

        ${
          state.showExplanation
            ? `
          <div class="explanation">
            <h3>Explanation</h3>
            <p>${question.explanation}</p>
          </div>
        `
            : ''
        }

        <div class="button-group">
          ${
            !state.answered
              ? `<button class="btn btn-primary" onclick="submitAnswer()">Submit Answer</button>`
              : `<button class="btn btn-primary" onclick="nextQuestion()">
              ${state.currentQuestion === state.questions.length - 1 ? 'View Results' : 'Next Question'}
            </button>`
          }
          <button class="btn btn-secondary" onclick="exitQuiz()">Exit Quiz</button>
        </div>
      </div>
    </div>
  `
}

function renderResults(app: HTMLDivElement) {
  if (state.timerInterval) clearInterval(state.timerInterval)

  const percentage = Math.round((state.score / state.questions.length) * 100)
  const passingScore = 70

  app.innerHTML = `
    <div class="quiz-container">
      <div class="results-container">
        <h1>Quiz Complete!</h1>
        
        <div class="score-display">
          <div class="score-circle ${percentage >= passingScore ? 'pass' : 'fail'}">
            <span class="score-number">${percentage}%</span>
          </div>
          <p class="score-text">
            You scored <strong>${state.score} out of ${state.questions.length}</strong> questions correctly.
          </p>
          <p class="pass-status ${percentage >= passingScore ? 'pass-text' : 'fail-text'}">
            ${percentage >= passingScore ? '✓ Passing Score' : '✗ Below Passing Score (70% required)'}
          </p>
        </div>

        <div class="results-summary">
          <h2>Results by Domain</h2>
          ${getDomainBreakdown()}
        </div>

        <div class="detailed-results">
          <h2>Detailed Review</h2>
          ${state.answers
            .map(
              (answer, index) => `
            <div class="result-item ${answer.selected === answer.correct ? 'correct' : 'incorrect'}">
              <div class="result-header">
                <span class="result-number">Q${index + 1}</span>
                <span class="result-status">${answer.selected === answer.correct ? '✓ Correct' : '✗ Incorrect'}</span>
              </div>
              <p class="result-question">${state.questions[index].question}</p>
              <p class="result-answer"><strong>Your answer:</strong> ${answer.selected}</p>
              ${answer.selected !== answer.correct ? `<p class="result-answer correct-answer"><strong>Correct answer:</strong> ${answer.correct}</p>` : ''}
            </div>
          `
            )
            .join('')}
        </div>

        <div class="button-group">
          <button class="btn btn-primary" onclick="goToMenu()">Back to Menu</button>
          <button class="btn btn-secondary" onclick="restartQuiz()">Retake Test</button>
        </div>
      </div>
    </div>
  `
}

function getDomainBreakdown(): string {
  const domainScores: { [key: string]: { correct: number; total: number } } = {}

  state.questions.forEach((q, index) => {
    if (!domainScores[q.domain]) {
      domainScores[q.domain] = { correct: 0, total: 0 }
    }
    domainScores[q.domain].total++
    if (state.answers[index] && state.answers[index].selected === state.answers[index].correct) {
      domainScores[q.domain].correct++
    }
  })

  return Object.entries(domainScores)
    .map(
      ([domain, scores]) => `
    <div class="domain-result">
      <span class="domain-name">${domain}</span>
      <span class="domain-score">${scores.correct}/${scores.total}</span>
    </div>
  `
    )
    .join('')
}

function selectAnswer(answer: string) {
  if (!state.answered) {
    state.selectedAnswer = answer
    renderQuiz()
  }
}

function submitAnswer() {
  if (state.selectedAnswer === null) {
    alert('Please select an answer before submitting.')
    return
  }

  const question = state.questions[state.currentQuestion]
  state.answered = true
  state.showExplanation = true

  state.answers.push({
    questionId: question.id,
    selected: state.selectedAnswer,
    correct: question.answer
  })

  if (state.selectedAnswer === question.answer) {
    state.score++
  }

  renderQuiz()
}

function nextQuestion() {
  if (state.currentQuestion < state.questions.length - 1) {
    state.currentQuestion++
    state.answered = false
    state.selectedAnswer = null
    state.showExplanation = false
    state.showTimeWarning = false
    renderQuiz()
  } else {
    state.quizComplete = true
    renderQuiz()
  }
}

function exitQuiz() {
  if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
    if (state.timerInterval) clearInterval(state.timerInterval)
    goToMenu()
  }
}

function restartQuiz() {
  if (state.testType) {
    startQuiz(state.testType)
  }
}

function goToMenu() {
  if (state.timerInterval) clearInterval(state.timerInterval)
  state.mode = 'menu'
  state.testType = null
  state.currentQuestion = 0
  state.score = 0
  state.answered = false
  state.selectedAnswer = null
  state.showExplanation = false
  state.quizComplete = false
  state.answers = []
  state.showTimeWarning = false
  renderMenu()
}

// Initialize the quiz
renderMenu()

// Make functions globally available
;(window as any).startQuiz = startQuiz
;(window as any).selectAnswer = selectAnswer
;(window as any).submitAnswer = submitAnswer
;(window as any).nextQuestion = nextQuestion
;(window as any).exitQuiz = exitQuiz
;(window as any).restartQuiz = restartQuiz
;(window as any).goToMenu = goToMenu
