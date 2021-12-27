const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is a closing element?',
        choice1: "< >",
        choice2: '<',
        choice3: 'left and righ arrow / in the middle',
        choice4: 'none',
        answer: 3,
    },
    {
        question: 'What stylesheet is like css?',
        choice1: 'bombbomb',
        choice2: 'html',
        choice3: 'bootstrap',
        choice4: 'none',
        answer: 3,
    },
    {
        question: 'How do you link css?',
        choice1: 'link rel="stylesheet" href="style.css"',
        choice2: 'link style css',
        choice3: 'link re=',
        choice4: 'none',
        answer: 1,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 3

startGame = () => {
    questionCounter = 0
    score = 0 
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true 
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.paremtElement.classList.add(classToApply)

        setTimeout(() => {
          selectedChoice.paremtElement.classList.remove(classToApply)  
          getNewQuestion()
        
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()