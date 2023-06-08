import { useState } from 'react';
import { quiz } from '../data/quiz';
import Quiz from './quiz.jsx'

const quizMenu = () => {
    // state of popup
    const [isOpen, setIsOpen] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState(null)
    // button to go back to the quiz menu
    const [showButton, setShowButton] = useState(false)
    // quizmenu state (opened or not)
    const [quizMenu, setQuizMenu] = useState(false)

    const openPopup = () => {
      setIsOpen(true);
      setQuizMenu(true)
    };

    const closePopup = () => {
      setIsOpen(false);
    };

    const openQuiz = (quizId) => {
        setSelectedQuiz(quizId)
        setShowButton(true)
        setQuizMenu(false)
    }

    const closeQuiz = () => {
        setSelectedQuiz(null)
        setShowButton(false)
        setQuizMenu(true)
    }


    return (
        <div className="relative">
            {!isOpen ? (

                <button onClick={openPopup}>
                Open Quizmenu
                </button>
            ) : (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">

                <div className="bg-white p-6 rounded-lg max-w-3xl overflow-y-auto max-h-[90vh]">
                        <button onClick={closePopup}>
                            Close quizmenu
                        </button>


                        {quizMenu ? (

                        <div>
                            <h1 className>Quiz menu: </h1>
                            {Object.entries(quiz).map(([key, value]) => (
                                <div className="text-base text-indigo-900 bg-white border border-gray-300 rounded-lg py-2 px-3 my-4 cursor-pointer"
                                key={value['topic']}
                                style={{ cursor: 'pointer' }}
                                onClick={() =>  openQuiz(key)}
                              >
                                {value['topic']}
                              </div>
                            ))}
                        </div>
                        ) : (
                        <div>
                            {showButton && (
                                <button onClick={closeQuiz} className="cursor-pointer bg-black-500 py-2 px-4">
                                    close quiz
                                </button>
                            )}
                            {selectedQuiz && (
                                <Quiz quizId={selectedQuiz}/>
                            )}
                        </div>
                        )}
                    </div>

            </div>)
        }


        </div>
    )

}

export default quizMenu