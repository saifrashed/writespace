import { useState, useEffect } from 'react';
import { quizList } from '../public/data/quizList';
import Questions from "./Questions"
import useQuiz from '@/lib/hooks/useQuiz';

const Quiz = () => {
    const { saveQuiz, getQuiz, gotQuizzes, quizzes } = useQuiz();

    useEffect(() => {
        getQuiz(50);
    }, []);

    console.log(quizzes);

    const [isOpen, setIsOpen] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState(null)
    const [showButton, setShowButton] = useState(false)
    const [quizMenu, setQuizMenu] = useState(false)
    // const [indexQuizHighScore, setIndexQuizHighScore] = useState(-1);

    const QuizScores = ({ scores }) => {
        // Create an object with quizId as keys
        const quizScoresObj = scores.reduce((acc, score) => {
          acc[score.quizId] = score;
          return acc;
        }, {});
    }

    const isQuizCompleted = (quizKey) => {
        // const index = quizzes.findIndex((quiz) => quiz.quizId === Number(quizKey));
        // setIndexQuizHighScore(index);
        return quizzes.some((quiz) => quiz.quizId === Number(quizKey))
    }

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
            {!isOpen && (
                <div className="fixed bottom-2 left-2">
                    <button
                        onClick={openPopup}
                        className="text-white px-4 w-auto animate-bounce  h-10 bg-pink-600 rounded-full hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                        <i className="fa-solid fa-list mr-2"></i> <span> Writing quiz</span>
                    </button>
                </div>
            )}

            {isOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white relative p-6 rounded-lg max-w-3xl overflow-y-auto max-h-[90vh] z-50">
                        <button type="button" onClick={closePopup} className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>

                        {quizMenu && gotQuizzes && (
                            <div>
                                <h1 className="text-center text-lg font-semibold">Quiz selection</h1>
                                <p>Choose a tutorial in which you want to improve.</p>
                                {Object.entries(quizList).map(([key, value]) => (
                                    <div className={`text-base border border-gray-300 rounded-lg py-2 px-3 my-4 cursor-pointer`}
                                        key={value['topic']}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => openQuiz(key)}
                                    >
                                        {value['topic']}
                                        {isQuizCompleted(key) && (
                                        <span style={{ color: 'green' , marginLeft: '10px' }}>✔</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {!quizMenu && (
                            <div>
                                {showButton && (
                                    <button type="button" onClick={closeQuiz} className="absolute top-3 left-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="popup-modal">
                                        <i className="fa-solid fa-arrow-left w-5 h-5"></i>
                                    </button>
                                )}

                                {selectedQuiz && (
                                    <Questions quizId={selectedQuiz} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Quiz;