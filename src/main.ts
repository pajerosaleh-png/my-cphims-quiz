import './style.css'
import quizData from './cphims_questions.json'
import seniorData from './senior_questions.json'

interface Question {
  id: number
  domain: string
  question: string
  options: string[]
  answer: string
  explanation: string
  level?: string
}

interface QuizState {
  mode: 'menu' | 'quiz' | 'results' | 'review'
  testType: 'practice' | 'timed' | 'fullexam' | 'mixed' | 'senior' | null
  currentQuestion: number
  score: number
  answered: boolean
  selectedAnswer: string | null
  showExplanation: boolean
  quizComplete: boolean
  answers: { questionId: number; selected: string; correct: string; skipped?: boolean }[]
  timeRemaining: number
  timerInterval: number | null
  totalTime: number
  questions: Question[]
  showTimeWarning: boolean
  skippedQuestions: number[]
}

const questions: Question[] = quizData
const seniorQuestions: Question[] = seniorData

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
  showTimeWarning: false,
  skippedQuestions: []
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function startQuiz(testType: 'practice' | 'timed' | 'fullexam' | 'mixed' | 'senior') {
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
  state.skippedQuestions = []

  if (testType === 'senior') {
    state.questions = [...seniorQuestions]
  } else if (testType === 'mixed') {
    state.questions = shuffleArray(questions)
  } else {
    state.questions = [...questions]
  }

  if (testType === 'timed' || testType === 'fullexam' || testType === 'senior') {
    state.totalTime = 120 * 60
    state.timeRemaining = state.totalTime
    startTimer()
  }

  renderQuiz()
}

function startTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval)

  state.timerInterval = window.setInterval(() => {
    state.timeRemaining--

    if (state.timeRemaining === 5 * 60) {
      state.showTimeWarning = true
    }

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

          <button class="menu-btn" onclick="startQuiz('senior')">
            <div class="menu-btn-title">🎓 Senior/Advanced</div>
            <div class="menu-btn-desc">50 scenario-based questions</div>
          </button>
        </div>

        <div class="menu-info">
          <p><strong>Standard Modes:</strong> 100 questions</p>
          <p><strong>Senior/Advanced:</strong> 50 scenario questions</p>
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
  const skippedCount = state.skippedQuestions.length

  let timerHTML = ''
  if (state.testType === 'timed' || state.testType === 'fullexam' || state.testType === 'senior') {
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
        <div class="quiz-mode-badge">${state.testType === 'practice' ? '📚 Practice' : state.testType === 'timed' ? '⏱️ Timed' : state.testType === 'fullexam' ? '📋 Full Exam' : state.testType === 'mixed' ? '🔀 Mixed' : '🎓 Senior'}</div>
        ${timerHTML}
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <p class="progress-text">Question ${state.currentQuestion + 1} of ${state.questions.length} ${skippedCount > 0 ? `| Skipped: ${skippedCount}` : ''}</p>
      </div>

      <div class="quiz-content">
        <div class="domain-badge">${question.domain} ${question.level ? `<span class="level-badge">${question.level.toUpperCase()}</span>` : ''}</div>
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
              ? `
              <button class="btn btn-primary" onclick="submitAnswer()">Submit Answer</button>
              <button class="btn btn-warning" onclick="skipQuestion()">⏭️ Skip Question</button>
            `
              : `
              <button class="btn btn-primary" onclick="nextQuestion()">
                ${state.currentQuestion === state.questions.length - 1 ? 'View Results' : 'Next Question'}
              </button>
            `
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
  const skippedCount = state.skippedQuestions.length

  const detailedResults = state.answers
    .map((answer, index) => {
      const isCorrect = answer.selected === answer.correct
      const isSkipped = answer.skipped
      const statusClass = isCorrect ? 'correct' : isSkipped ? 'skipped' : 'incorrect'
      const statusText = isSkipped ? '⏭️ Skipped' : isCorrect ? '✓ Correct' : '✗ Incorrect'
      const answerContent = !isSkipped 
        ? `<p class="result-answer"><strong>Your answer:</strong> ${answer.selected}</p>
           ${answer.selected !== answer.correct ? `<p class="result-answer correct-answer"><strong>Correct answer:</strong> ${answer.correct}</p>` : ''}`
        : ''
      
      return `
        <div class="result-item ${statusClass}">
          <div class="result-header">
            <span class="result-number">Q${index + 1}</span>
            <span class="result-status">${statusText}</span>
          </div>
          <p class="result-question">${state.questions[index].question}</p>
          ${answerContent}
        </div>
      `
    })
    .join('')

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
          ${skippedCount > 0 ? `<p class="skipped-text">Skipped: <strong>${skippedCount}</strong> questions</p>` : ''}
          <p class="pass-status ${percentage >= passingScore ? 'pass-text' : 'fail-text'}">
            ${percentage >= passingScore ? '✓ Passing Score' : '✗ Below Passing Score (70% required)'}
          </p>
        </div>

        <div class="results-summary">
          <h2>Results by Domain</h2>
          ${getDomainBreakdown()}
        </div>

        ${skippedCount > 0 ? `
          <div class="skipped-section">
            <h2>Skipped Questions</h2>
            <button class="btn btn-info" onclick="reviewSkipped()">📝 Review Skipped Questions</button>
          </div>
        ` : ''}

        <div class="detailed-results">
          <h2>Detailed Review</h2>
          ${detailedResults}
        </div>

        <div class="button-group">
          <button class="btn btn-primary" onclick="goToMenu()">Back to Menu</button>
          <button class="btn btn-secondary" onclick="restartQuiz()">Retake Test</button>
        </div>
      </div>
    </div>
  `
}

function reviewSkipped() {
  state.mode = 'review'
  state.currentQuestion = state.skippedQuestions[0]
  state.answered = false
  state.selectedAnswer = null
  state.showExplanation = false
  renderReview()
}

function renderReview() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  const skippedIndices = state.skippedQuestions
  const currentSkippedIndex = skippedIndices.indexOf(state.currentQuestion)
  const question = state.questions[state.currentQuestion]

  app.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header">
        <h1>Review Skipped Questions</h1>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${((currentSkippedIndex + 1) / skippedIndices.length) * 100}%"></div>
        </div>
        <p class="progress-text">Skipped Question ${currentSkippedIndex + 1} of ${skippedIndices.length}</p>
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
              : `<button class="btn btn-primary" onclick="nextSkipped()">
              ${currentSkippedIndex === skippedIndices.length - 1 ? 'Back to Results' : 'Next Skipped'}
            </button>`
          }
          <button class="btn btn-secondary" onclick="backToResults()">Back to Results</button>
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
    if (state.answers[index] && !state.answers[index].skipped && state.answers[index].selected === state.answers[index].correct) {
      domainScores[q.domain].correct++
    }
  })

  return Object.entries(domainScores)
    .map(([domain, scores]) => `
    <div class="domain-result">
      <span class="domain-name">${domain}</span>
      <span class="domain-score">${scores.correct}/${scores.total}</span>
    </div>
  `)
    .join('')
}

function selectAnswer(answer: string) {
  if (!state.answered) {
    state.selectedAnswer = answer
    if (state.mode === 'quiz') {
      renderQuiz()
    } else {
      renderReview()
    }
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
    correct: question.answer,
    skipped: false
  })

  if (state.selectedAnswer === question.answer) {
    state.score++
  }

  if (state.mode === 'quiz') {
    renderQuiz()
  } else {
    renderReview()
  }
}

function skipQuestion() {
  const question = state.questions[state.currentQuestion]
  
  state.answers.push({
    questionId: question.id,
    selected: '',
    correct: question.answer,
    skipped: true
  })

  state.skippedQuestions.push(state.currentQuestion)
  nextQuestion()
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

function nextSkipped() {
  const skippedIndices = state.skippedQuestions
  const currentSkippedIndex = skippedIndices.indexOf(state.currentQuestion)
  
  if (currentSkippedIndex < skippedIndices.length - 1) {
    state.currentQuestion = skippedIndices[currentSkippedIndex + 1]
    state.answered = false
    state.selectedAnswer = null
    state.showExplanation = false
    renderReview()
  } else {
    backToResults()
  }
}

function backToResults() {
  state.mode = 'results'
  renderResults(document.querySelector<HTMLDivElement>('#app')!)
}

function exitQuiz() {
  if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
    if (state.timerInterval) clearInterval(state.timerInterval)
    goToMenu()
  }
}

function restartQuiz() {
  if (state.testType) {
    startQuiz(state.testType as 'practice' | 'timed' | 'fullexam' | 'mixed' | 'senior')
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
  state.skippedQuestions = []
  renderMenu()
}

renderMenu()

;(window as any).startQuiz = startQuiz
;(window as any).selectAnswer = selectAnswer
;(window as any).submitAnswer = submitAnswer
;(window as any).skipQuestion = skipQuestion
;(window as any).nextQuestion = nextQuestion
;(window as any).nextSkipped = nextSkipped
;(window as any).exitQuiz = exitQuiz
;(window as any).restartQuiz = restartQuiz
;(window as any).goToMenu = goToMenu
;(window as any).reviewSkipped = reviewSkipped
;(window as any).backToResults = backToResults
