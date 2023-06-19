import { useState, useEffect } from 'react';
import { quizList } from '../public/data/quizList';
import useQuiz from '@/lib/hooks/useQuiz';

const Questions = (quizId) => {
  const { saveQuiz, getQuiz, gotQuizzes, quizzes } = useQuiz();

  // returned een array
  getQuiz(50);

  let selectedQuiz = quizList[quizId['quizId']]
  const [latestHighScore, setLatestHighScore] = useState(null)
  const [answers, setAnswers] = useState([])
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1)
  const [selectedAnswer, setSelectedAnswer] = useState(false)
  const [selAnswer, setSelAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const { questions } = selectedQuiz
  const { question, choices, correctAnswer } = questions[activeQuestion]

  const handleAnswers = () => {
    const answer = {
      question: question,
      answered: selAnswer,
      correctAnswer: correctAnswer,
    };

    setAnswers(prevAnswers => [...prevAnswers, answer]);
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
    }
    // When the last question is filled in
    else {
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
  useEffect(() => {
    if (showResult && gotQuizzes) {
      saveQuiz(50, quizId.quizId, result.correctAnswers);
      console.log(quizzes, "DE QUIZZES")
      const quizScoresObj = quizzes.reduce((acc, quiz) => {
        acc[quiz.quizId] = quiz;
        return acc;
      }, {});
      console.log(quizScoresObj, "SE OBJ");

      setLatestHighScore(quizScoresObj[quizId.quizId].latestHighScore);
      console.log(latestHighScore, "DE AATA HIGH");
    }

  }, [showResult]);

  return (
    <>
      {/* If the Quiz is in progress */}
      {!showResult && (
        <div className='pt-6'>
          <span>{activeQuestion + 1}</span>
          <span>/{questions.length}</span>
          <h2>{question}</h2>
          <div>
            {choices.map((answer, index) => (
              <div
                key={answer}
                className={(selectedAnswerIndex === index ? 'text-base border border-gray-300 rounded-lg py-2 px-3 my-4 cursor-pointer transition-all bg-pink-200' : 'text-base transition-all border border-gray-300 rounded-lg py-2 px-3 my-4 cursor-pointer')}
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
      )}

      {/* If the Quiz is done and result is shown */}
      {showResult && gotQuizzes && (
        <div className="text-center">
          <h3 className="text-2xl font-bold">Result</h3>
          <p>Total Question: {questions.length}</p>
          <p>Correct Answers: {result.correctAnswers}</p>
          <p>Wrong Answers: {result.wrongAnswers}</p>
          {/* <p>Latest Highscore: {latestHighScore} </p> */}
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
    </>
  )
}

export default Questions;