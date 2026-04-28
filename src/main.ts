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
  currentQuestion: number
  score: number
  answered: boolean
  selectedAnswer: string | null
  showExplanation: boolean
  quizComplete: boolean
  answers: { questionId: number; selected: string; correct: string }[]
}

const questions: Question[] = quizData

const state: QuizState = {
  currentQuestion: 0,
  score: 0,
  answered: false,
  selectedAnswer: null,
  showExplanation: false,
  quizComplete: false,
  answers: []
}

function renderQuiz() {
  const app = document.querySelector<HTMLDivElement>('#app')!

  if (state.quizComplete) {
    renderResults(app)
    return
  }

  const question = questions[state.currentQuestion]
  const progress = ((state.currentQuestion + 1) / questions.length) * 100

  app.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header">
        <h1>CPHIMS Self-Assessment Quiz</h1>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <p class="progress-text">Question ${state.currentQuestion + 1} of ${questions.length}</p>
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
              ${state.currentQuestion === questions.length - 1 ? 'View Results' : 'Next Question'}
            </button>`
          }
        </div>
      </div>
    </div>
  `
}

function renderResults(app: HTMLDivElement) {
  const percentage = Math.round((state.score / questions.length) * 100)
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
            You scored <strong>${state.score} out of ${questions.length}</strong> questions correctly.
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
              <p class="result-question">${questions[index].question}</p>
              <p class="result-answer"><strong>Your answer:</strong> ${answer.selected}</p>
              ${answer.selected !== answer.correct ? `<p class="result-answer correct-answer"><strong>Correct answer:</strong> ${answer.correct}</p>` : ''}
            </div>
          `
            )
            .join('')}
        </div>

        <div class="button-group">
          <button class="btn btn-primary" onclick="restartQuiz()">Restart Quiz</button>
        </div>
      </div>
    </div>
  `
}

function getDomainBreakdown(): string {
  const domainScores: { [key: string]: { correct: number; total: number } } = {}

  questions.forEach((q, index) => {
    if (!domainScores[q.domain]) {
      domainScores[q.domain] = { correct: 0, total: 0 }
    }
    domainScores[q.domain].total++
    if (state.answers[index].selected === state.answers[index].correct) {
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

  const question = questions[state.currentQuestion]
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
  if (state.currentQuestion < questions.length - 1) {
    state.currentQuestion++
    state.answered = false
    state.selectedAnswer = null
    state.showExplanation = false
    renderQuiz()
  } else {
    state.quizComplete = true
    renderQuiz()
  }
}

function restartQuiz() {
  state.currentQuestion = 0
  state.score = 0
  state.answered = false
  state.selectedAnswer = null
  state.showExplanation = false
  state.quizComplete = false
  state.answers = []
  renderQuiz()
}

// Initialize the quiz
renderQuiz()

// Make functions globally available
;(window as any).selectAnswer = selectAnswer
;(window as any).submitAnswer = submitAnswer
;(window as any).nextQuestion = nextQuestion
;(window as any).restartQuiz = restartQuiz
