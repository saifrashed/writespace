import { useState, useEffect } from 'react';
import useQuiz from '@/lib/hooks/useQuiz';
import useQuizScore from '@/lib/hooks/useQuizScore';
import useAuthentication from "@/lib/hooks/useAuthentication";
import PopConfetti from './popConfetti';

const Questions = ({quizId, questions, userScores}) => {
  const { token } = useAuthentication();
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
  const [quizScores, setQuizScores] = useState([])

  const { question, choices, correctAnswer } = questions[activeQuestion];
  const {getOneScore, saveQuizScore} = useQuizScore(token);

  const handleAnswers = () => {
    const answer = {
      question: question,
      answered: selAnswer,
      correctAnswer: correctAnswer,
    };

    setAnswers(prevAnswers => [...prevAnswers, answer]);
  };

  const getHighScore = () => {
    const userScore = userScores.find((quiz) => quiz.quizId === Number(quizId))

    if (userScore.highScore === undefined) {
      console.log("no highscore yet")
      return <div><PopConfetti/><p>{'New highscore: ' + String(result.correctAnswers)}</p></div>
    }
    else if (result.correctAnswers > userScore.highScore) {
      console.log("new highscore")
      return <div><PopConfetti/><p>{'New highscore: ' + String(result.correctAnswers)}</p></div>
    }
    return <p>{'Highscore: ' + String(userScore.highScore)}</p>
  }

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
    const quizScores = getOneScore(quizId, token);
    setQuizScores(quizScores);
  }, [])

  useEffect(() => {
    if (showResult) {
      saveQuizScore(String(quizId), token, result.correctAnswers);
      // // const quizScoresObj = quizzes.reduce((acc, quiz) => {
      //   acc[quiz.quizId] = quiz;
      //   return acc;
      // }, {});
      // console.log(quizScoresObj, "SE OBJ");
    }
  }, [showResult]);

  return (
    <>
      {/* If the Quiz is in progress */}
      {!showResult &&  (
        <div className='pt-6'>
          <span>{activeQuestion + 1}</span>
          <span>/{questions.length}</span>
          <h2>{question}</h2>
          <div>
            {choices.map((answer, index) => (
              <div
                key={answer}
                className={(selectedAnswerIndex === index ? 'text-base border border-gray-300 rounded-lg py-2 px-3 my-4 cursor-pointer transition-all bg-blue-200' : 'text-base transition-all border border-gray-300 rounded-lg py-2 px-3 my-4 cursor-pointer')}
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
      {showResult && (
        <div className="text-center">
          <h3 className="text-2xl font-bold">Result</h3>
          <p>Total Questions: {questions.length}</p>
          <p>Correct Answers: {result.correctAnswers}</p>
          <p>Wrong Answers: {result.wrongAnswers}</p>
          {getHighScore()}
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
          { quizScores && (
            console.log(quizScores)
          )}
        </div>
      )}
    </>
  )
}

export default Questions;