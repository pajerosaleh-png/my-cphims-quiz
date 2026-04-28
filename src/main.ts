import quizData from './cphims_questions.json'
import model2Data from './questions_model2.json'
import model3Data from './questions_model3.json'
import model4Data from './questions_model4.json'
import model5Data from './questions_model5.json'
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
  currentModel: number
}

const allModels = [quizData, model2Data, model3Data, model4Data, model5Data]
const seniorQuestions: Question[] = seniorData

// Get current model based on localStorage
function getCurrentModel(): Question[] {
  const savedModel = localStorage.getItem('currentModel')
  const modelIndex = savedModel ? (parseInt(savedModel) % 5) : 0
  return allModels[modelIndex]
}

// Rotate to next model
function rotateModel(): void {
  const currentModel = localStorage.getItem('currentModel')
  const nextModel = currentModel ? (parseInt(currentModel) + 1) % 5 : 1
  localStorage.setItem('currentModel', nextModel.toString())
}

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
  skippedQuestions: [],
  currentModel: 0,
}

function getRandomQuestions(questions: Question[], count: number): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function startQuiz(testType: 'practice' | 'timed' | 'fullexam' | 'mixed' | 'senior'): void {
  state.testType = testType
  state.currentQuestion = 0
  state.score = 0
  state.answered = false
  state.selectedAnswer = null
  state.showExplanation = false
  state.quizComplete = false
  state.answers = []
  state.timeRemaining = 0
  state.skippedQuestions = []
  state.showTimeWarning = false

  if (testType === 'senior') {
    state.questions = seniorQuestions
  } else if (testType === 'mixed') {
    const currentModel = getCurrentModel()
    state.questions = getRandomQuestions(currentModel, 100)
  } else {
    const currentModel = getCurrentModel()
    state.questions = currentModel
  }

  if (testType === 'timed' || testType === 'fullexam') {
    state.totalTime = 120 * 60
    state.timeRemaining = state.totalTime
    startTimer()
  }

  state.mode = 'quiz'
  render()
}

function startTimer(): void {
  if (state.timerInterval) clearInterval(state.timerInterval)

  state.timerInterval = window.setInterval(() => {
    state.timeRemaining--

    if (state.timeRemaining === 300) {
      state.showTimeWarning = true
    }

    if (state.timeRemaining <= 0) {
      clearInterval(state.timerInterval!)
      completeQuiz()
    }

    render()
  }, 1000)
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function selectAnswer(answer: string): void {
  state.selectedAnswer = answer
  state.answered = true
  render()
}

function submitAnswer(): void {
  const currentQ = state.questions[state.currentQuestion]
  const isCorrect = state.selectedAnswer === currentQ.answer

  state.answers.push({
    questionId: currentQ.id,
    selected: state.selectedAnswer || '',
    correct: currentQ.answer,
  })

  if (isCorrect) state.score++

  state.showExplanation = true
  render()
}

function skipQuestion(): void {
  const currentQ = state.questions[state.currentQuestion]
  state.skippedQuestions.push(state.currentQuestion)

  state.answers.push({
    questionId: currentQ.id,
    selected: '',
    correct: currentQ.answer,
    skipped: true,
  })

  nextQuestion()
}

function nextQuestion(): void {
  if (state.currentQuestion < state.questions.length - 1) {
    state.currentQuestion++
    state.selectedAnswer = null
    state.answered = false
    state.showExplanation = false
    render()
  } else {
    completeQuiz()
  }
}

function completeQuiz(): void {
  if (state.timerInterval) clearInterval(state.timerInterval)
  rotateModel()
  state.quizComplete = true
  state.mode = 'results'
  render()
}

function reviewSkipped(): void {
  if (state.skippedQuestions.length === 0) {
    state.mode = 'menu'
    render()
    return
  }

  state.mode = 'review'
  state.currentQuestion = 0
  state.selectedAnswer = null
  state.answered = false
  state.showExplanation = false
  render()
}

function nextSkippedQuestion(): void {
  if (state.currentQuestion < state.skippedQuestions.length - 1) {
    state.currentQuestion++
    state.selectedAnswer = null
    state.answered = false
    state.showExplanation = false
    render()
  } else {
    state.mode = 'menu'
    render()
  }
}

function submitSkippedAnswer(): void {
  const skippedIndex = state.skippedQuestions[state.currentQuestion]
  const currentQ = state.questions[skippedIndex]
  const isCorrect = state.selectedAnswer === currentQ.answer

  const answerIndex = state.answers.findIndex(a => a.questionId === currentQ.id)
  if (answerIndex !== -1) {
    state.answers[answerIndex].selected = state.selectedAnswer || ''
    if (isCorrect && state.answers[answerIndex].skipped) {
      state.score++
    }
  }

  state.showExplanation = true
  render()
}

function backToMenu(): void {
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
  state.timeRemaining = 0
  state.skippedQuestions = []
  state.showTimeWarning = false
  render()
}

function render(): void {
  const app = document.getElementById('app')!

  if (state.mode === 'menu') {
    const currentModelNum = (parseInt(localStorage.getItem('currentModel') || '0') % 5) + 1
    app.innerHTML = `
      <div class="menu-container">
        <div class="menu-header">
          <h1>CPHIMS Self-Assessment Quiz</h1>
          <p>Prepare for your CPHIMS certification exam</p>
          <p class="model-indicator">Question Model: ${currentModelNum}/5</p>
        </div>
        <div class="menu-grid">
          <button class="menu-btn practice-btn" onclick="window.startQuiz('practice')">
            <div class="btn-icon">📚</div>
            <h3>Practice Mode</h3>
            <p>Learn at your own pace</p>
          </button>
          <button class="menu-btn timed-btn" onclick="window.startQuiz('timed')">
            <div class="btn-icon">⏱️</div>
            <h3>Timed Mode</h3>
            <p>120 minutes with timer</p>
          </button>
          <button class="menu-btn exam-btn" onclick="window.startQuiz('fullexam')">
            <div class="btn-icon">📋</div>
            <h3>Full Exam</h3>
            <p>Official format</p>
          </button>
          <button class="menu-btn mixed-btn" onclick="window.startQuiz('mixed')">
            <div class="btn-icon">🔀</div>
            <h3>Mixed Mode</h3>
            <p>Random question order</p>
          </button>
          <button class="menu-btn senior-btn" onclick="window.startQuiz('senior')">
            <div class="btn-icon">🎓</div>
            <h3>Senior/Advanced</h3>
            <p>Complex scenarios</p>
          </button>
        </div>
        <div class="menu-info">
          <p>✨ Each time you retake the quiz, you'll get a different set of questions!</p>
          <p>Currently on Model ${currentModelNum} - Next retake will use Model ${(currentModelNum % 5) + 1}</p>
        </div>
      </div>
    `
  } else if (state.mode === 'quiz') {
    const currentQ = state.questions[state.currentQuestion]
    const progress = ((state.currentQuestion + 1) / state.questions.length) * 100

    let timerHTML = ''
    if (state.testType === 'timed' || state.testType === 'fullexam') {
      const timerClass = state.showTimeWarning ? 'timer-warning' : ''
      timerHTML = `<div class="timer ${timerClass}">⏱️ ${formatTime(state.timeRemaining)}</div>`
    }

    app.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <div class="quiz-info">
            <h2>${state.testType === 'senior' ? '🎓 Senior/Advanced Mode' : `${state.testType?.toUpperCase()}`}</h2>
            <p>Question ${state.currentQuestion + 1} of ${state.questions.length}</p>
          </div>
          ${timerHTML}
        </div>

        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>

        <div class="question-section">
          <div class="domain-badge">${currentQ.domain}</div>
          <h3>${currentQ.question}</h3>

          <div class="options">
            ${currentQ.options.map((option, idx) => `
              <button class="option ${state.selectedAnswer === option ? 'selected' : ''}" 
                      onclick="window.selectAnswer('${option.replace(/'/g, "\\'")}')">
                <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
                <span>${option}</span>
              </button>
            `).join('')}
          </div>

          ${state.showExplanation ? `
            <div class="explanation ${state.selectedAnswer === currentQ.answer ? 'correct' : 'incorrect'}">
              <h4>${state.selectedAnswer === currentQ.answer ? '✓ Correct!' : '✗ Incorrect'}</h4>
              <p><strong>Correct Answer:</strong> ${currentQ.answer}</p>
              <p><strong>Explanation:</strong> ${currentQ.explanation}</p>
            </div>
          ` : ''}
        </div>

        <div class="quiz-actions">
          ${!state.showExplanation ? `
            <button class="btn-skip" onclick="window.skipQuestion()">⏭️ Skip Question</button>
            <button class="btn-submit" onclick="window.submitAnswer()" ${!state.answered ? 'disabled' : ''}>Submit Answer</button>
          ` : `
            <button class="btn-next" onclick="window.nextQuestion()">
              ${state.currentQuestion === state.questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
            </button>
          `}
          <button class="btn-exit" onclick="window.backToMenu()">Exit Quiz</button>
        </div>
      </div>
    `
  } else if (state.mode === 'results') {
    const percentage = Math.round((state.score / state.questions.length) * 100)
    const passed = percentage >= 70
    const skippedCount = state.skippedQuestions.length

    const domainScores: { [key: string]: { correct: number; total: number } } = {}
    state.questions.forEach((q, idx) => {
      if (!domainScores[q.domain]) {
        domainScores[q.domain] = { correct: 0, total: 0 }
      }
      domainScores[q.domain].total++
      const answer = state.answers[idx]
      if (answer && answer.selected === q.answer) {
        domainScores[q.domain].correct++
      }
    })

    app.innerHTML = `
      <div class="results-container">
        <div class="results-header">
          <h1>${passed ? '🎉 Congratulations!' : '📊 Quiz Complete'}</h1>
          <p>${passed ? 'You passed the exam!' : 'Keep practicing to improve!'}</p>
        </div>

        <div class="score-box ${passed ? 'passed' : 'failed'}">
          <div class="score-number">${percentage}%</div>
          <div class="score-text">${state.score}/${state.questions.length} Correct</div>
          <div class="score-status">${passed ? '✓ PASSED (70% required)' : '✗ FAILED (70% required)'}</div>
        </div>

        ${skippedCount > 0 ? `
          <div class="skipped-section">
            <h3>⏭️ Skipped Questions: ${skippedCount}</h3>
            <button class="btn-review" onclick="window.reviewSkipped()">Review Skipped Questions</button>
          </div>
        ` : ''}

        <div class="domain-breakdown">
          <h3>Domain Breakdown</h3>
          <div class="domain-list">
            ${Object.entries(domainScores).map(([domain, scores]) => {
              const domainPercentage = Math.round((scores.correct / scores.total) * 100)
              return `
                <div class="domain-item">
                  <span class="domain-name">${domain}</span>
                  <div class="domain-bar">
                    <div class="domain-fill" style="width: ${domainPercentage}%"></div>
                  </div>
                  <span class="domain-score">${scores.correct}/${scores.total}</span>
                </div>
              `
            }).join('')}
          </div>
        </div>

        <div class="results-actions">
          <button class="btn-retake" onclick="window.backToMenu()">🔄 Retake Quiz (New Model)</button>
          <button class="btn-menu" onclick="window.backToMenu()">📚 Back to Menu</button>
        </div>
      </div>
    `
  } else if (state.mode === 'review') {
    const skippedIndex = state.skippedQuestions[state.currentQuestion]
    const currentQ = state.questions[skippedIndex]

    app.innerHTML = `
      <div class="review-container">
        <div class="review-header">
          <h2>📝 Review Skipped Questions</h2>
          <p>Question ${state.currentQuestion + 1} of ${state.skippedQuestions.length}</p>
        </div>

        <div class="question-section">
          <div class="domain-badge">${currentQ.domain}</div>
          <h3>${currentQ.question}</h3>

          <div class="options">
            ${currentQ.options.map((option, idx) => `
              <button class="option ${state.selectedAnswer === option ? 'selected' : ''}" 
                      onclick="window.selectAnswer('${option.replace(/'/g, "\\'")}')">
                <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
                <span>${option}</span>
              </button>
            `).join('')}
          </div>

          ${state.showExplanation ? `
            <div class="explanation ${state.selectedAnswer === currentQ.answer ? 'correct' : 'incorrect'}">
              <h4>${state.selectedAnswer === currentQ.answer ? '✓ Correct!' : '✗ Incorrect'}</h4>
              <p><strong>Correct Answer:</strong> ${currentQ.answer}</p>
              <p><strong>Explanation:</strong> ${currentQ.explanation}</p>
            </div>
          ` : ''}
        </div>

        <div class="review-actions">
          ${!state.showExplanation ? `
            <button class="btn-submit" onclick="window.submitSkippedAnswer()" ${!state.answered ? 'disabled' : ''}>Submit Answer</button>
          ` : `
            <button class="btn-next" onclick="window.nextSkippedQuestion()">
              ${state.currentQuestion === state.skippedQuestions.length - 1 ? 'Finish Review' : 'Next Skipped'}
            </button>
          `}
          <button class="btn-exit" onclick="window.backToMenu()">Back to Menu</button>
        </div>
      </div>
    `
  }
}

// Expose functions globally
;(window as any).startQuiz = startQuiz
;(window as any).selectAnswer = selectAnswer
;(window as any).submitAnswer = submitAnswer
;(window as any).skipQuestion = skipQuestion
;(window as any).nextQuestion = nextQuestion
;(window as any).backToMenu = backToMenu
;(window as any).reviewSkipped = reviewSkipped
;(window as any).submitSkippedAnswer = submitSkippedAnswer
;(window as any).nextSkippedQuestion = nextSkippedQuestion

render()
