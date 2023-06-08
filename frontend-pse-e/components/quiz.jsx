import { useState } from 'react';
import { quiz } from '../data/quiz';

const Quiz = (quizId) => {
  let selectedQuiz = quiz[quizId['quizId']]
  // keep track of question, answered, correctAnswer
  const [answers, setAnswers] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1)
  // if the selected answer is true or not
  const [selectedAnswer, setSelectedAnswer] = useState(false)
  // what the selected answer is
  const [selAnswer, setSelAnswer] = useState('')
  // result menu
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const { questions } = selectedQuiz
  const { question, choices, correctAnswer } = questions[activeQuestion]

  // append to the answers array
  const handleAnswers = () => {

    const answer = {
      question: question,
      answered: selAnswer,
      correctAnswer: correctAnswer,
    };

    setAnswers(prevAnswers => [...prevAnswers, answer]);
    console.log(answers)
  };

  // when the next button is clicked
  const onClickNext = () => {
    handleAnswers()
    setSelectedAnswerIndex(-1)

    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )


    if (activeQuestion !== questions.length - 1) {

    setActiveQuestion((prev) => prev + 1)
    } else {
      setShowResult(true);
    }

    setSelectedAnswer(false);
    setSelAnswer('');
  }

  // when answer is selected
  const onAnswerSelected = (answer, index) => {
    setSelAnswer(answer)
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  return (
        <div>
          {!showResult ? (
          <div>
            <h1 className>Quiz</h1>
            <div>
              <span>{activeQuestion + 1}</span>
              <span>/{questions.length}</span>
            </div>
            <h2>{question}</h2>
            <div>
              {choices.map((answer, index) => (
                <div
                  key={answer}
                  className={selectedAnswerIndex === index ? 'text-base text-indigo-900 border border-gray-300 rounded-lg py-2 px-3 my-4 cursor-pointer bg-pink-200' : 'text-base text-indigo-900 border border-gray-300 rounded-lg py-2 px-3 my-4 cursor-pointer'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onAnswerSelected(answer, index)}
                >
                  {answer}
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button className="rounded-lg text-xl h-8 px-3 my-4 focus:outline-none"
                onClick={onClickNext}
                disabled={selectedAnswerIndex === -1}
              >
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold">Result</h3>
            <p>Total Question: {questions.length}</p>
            <p>Correct Answers: {result.correctAnswers}</p>
            <p>Wrong Answers: {result.wrongAnswers}</p>
            <br />
            {answers.map((object, index) => (
              <div
              key={object.question}>
                <p>{'Question: ' + object.question.split(':')[0]}</p>
                {object.correctAnswer && object.answered !== object.correctAnswer && (
                  <p>{'Answered: ' + object.answered} <span style={{ color: 'red' }}>✘</span></p>
                )}
                {object.correctAnswer && object.answered === object.correctAnswer && (
                  <p>{'Answered: ' + object.answered} <span style={{ color: 'green' }}>✔</span></p>
                )}
                <p>{'Correct Answer: ' + object.correctAnswer}</p>
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
  )
}

export default Quiz;