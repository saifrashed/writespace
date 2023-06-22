// TO DO:
// - Somehow filter out math and stuff.
// - How to handle reaching the max number of API calls?

import React, { useEffect, useState } from "react";
import convertPdfToText from "@/lib/pdfToText";
import { useNotification } from "@/lib/hooks/useNotification";
import languageTool from "@/lib/hooks/languageTool";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import filterMathText from "@/lib/mathFilter";
import useUser from "@/lib/hooks/useUser";
import useAuthentication from "@/lib/hooks/useAuthentication";
import {useRouter} from 'next/router';
import ScaledBadge from '@/components/badge-template/Badge';


const SpellingQuiz = ({ fileUrl, showPopup, togglePopup }) => {

  if (!showPopup) {
    return null;
  }

  const buttonClass = "px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 " +
                      "text-lg font-medium rounded-full";

  const [extractedText, setExtractedText] = useState("");
  const [introScreen, setIntroScreen] = useState(true);
  const [outroScreen, setOutroScreen] = useState(false);
  const [language, setLanguage] = useState("");
  const { onError } = useNotification();
  const [currentMistakeIndex, setCurrentMistakeIndex] = useState(-1);
  const [maxSuggestions, setMaxSuggestions] = useState(6);
  const [dataMatches, setDataMatches] = useState(null);
  const [isAPILoading, setIsAPILoading] = useState(false);
  let [usedReplacements, setUsedReplacements] = useState([]);

  const router = useRouter()
  const {courseId, assignmentId} = router.query;
  const {token} = useAuthentication()
  const {addUserBadges} = useUser(token)

  const handleAddBadge = () => {  // Give spelling bee badge.
    addUserBadges([2], courseId, assignmentId, '', '', token);
  }

  // To filter out all the suggestions for acronyms.
  const isAcronym = (value) => {
    const capitalLettersCount =
      value.split('').filter((char) => char === char.toUpperCase()).length;
    return capitalLettersCount >= 2;
  };

  const filterData = (inputData) => {

    // Filter out mistakes most likely caused by pdf to text conversion errors.
    inputData.matches =
      inputData.matches.filter((match) => !match.ignoreForIncompleteSentence);

    // Filter out acronyms as suggestions for a match.
    for (const match of inputData.matches) {
      match.replacements =
        match.replacements.filter((replacement) => !isAcronym(replacement.value))
    }

    // Give spelling bee badge.
    if (inputData.matches.length === 0) {
      handleAddBadge();
    }

    return inputData.matches;
  }

  useEffect(() => {
    const fetchPdfText = async () => {
      const pdfText = await convertPdfToText(fileUrl);
      setExtractedText(pdfText);
      console.log("extracted text:",extractedText);
    };

    fetchPdfText();
  }, [fileUrl]);

  const selectLanguage = async (lang) => {
    setLanguage(lang);
    console.log("Using language " + lang);
    setIsAPILoading(true);  // To disable start button.


    try {
      const response = await languageTool(
        lang,
        extractedText
      );
      setDataMatches(filterData(response));
      setIsAPILoading(false); // Enable start button after API call is done.

      // Initialize/resize the array with replacements chosen by user.
      setUsedReplacements(Array(response.matches.length).fill(undefined));
    } catch (error) {
      console.log(error);
      onError("API call failed");
    }
  };

  const resetValues = () => {
    setIntroScreen(true);
    setOutroScreen(false);
    setCurrentMistakeIndex(-1);
    setMaxSuggestions(6);
  }

  const handleCloseModal = () => {
    togglePopup();
    resetValues();
  };

  const BackButton = () => (
    <button
      type="button"
      onClick={resetValues}
      className="absolute top-3 left-2.5 text-black bg-transparent hover:bg-gray-200
                hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex
                items-center">
      <i className="fa-solid fa-arrow-left w-5 h-5"></i>
    </button>
  );

  // The number of suggested replacements for our current mistake.
  const numOfSuggestions = (dataMatches) =>
    dataMatches[currentMistakeIndex].replacements
    .filter((replacement) => !isAcronym(replacement.value))  // Don't take acronyms into account.
    .length || 0;

  // Update replacement at current mistake.
  const replace = (replaceVal) => {
    usedReplacements[currentMistakeIndex] === replaceVal
      ? usedReplacements[currentMistakeIndex] = undefined  // Undo selection.
      : usedReplacements[currentMistakeIndex] = replaceVal;  // Select.

    // Trigger a reload of the component by updating the state.
    setUsedReplacements([...usedReplacements]);
  }

  return (
    <>
      <div className="relative">
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center
                        justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white relative p-6 rounded-lg max-w-2xl overflow-y-auto
                           max-h-[90vh] z-50">

            {/* Topright X close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200
                      hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex
                      items-center">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                   viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414
                     10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0
                     01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            {introScreen && (
              <>
                <div>
                  <h1 className="text-center text-lg font-semibold pt-4 pb-4">
                    Welcome to the Spelling Revision Quiz!
                  </h1>
                  <p>
                    Improve your writing skills with this quiz designed to correct spelling errors
                    in your assignments. Our text analysis API suggests revisions on your work, but
                    remember that language is subjective, and the API may not always be accurate.
                    There might also be some inaccuracies caused by extracting the text from your
                    assignment.
                    <br/><br/>
                    Engage actively with the quiz, use its suggestions to see if they fit,
                    and discuss any disagreements with your peers. Collaboration and critical
                    thinking are key to refining your writing abilities.
                    <br/><br/>
                    Let's enhance your spelling skills together!
                    <br/><br/>
                    <b>To start, select the language in which you've written your assignment:</b>
                  </p>
                </div>

                {/* Language selection. */}
                {/* More could be added. 76 languages supported by API. */}
                <div className="flex justify-center space-x-5 mt-4 pb-4">
                  <button onClick={() => selectLanguage('en-US')} className={buttonClass}>
                    English (US) <span className="fi fi-us"></span>
                  </button>
                  <button onClick={() => selectLanguage('en-GB')} className={buttonClass}>
                    English (UK) <span className="fi fi-gb"></span>
                  </button>
                  <button onClick={() => selectLanguage('nl-NL')} className={buttonClass}>
                    Dutch (NL) <span className="fi fi-nl"></span>
                  </button>
                </div>

                {isAPILoading && (
                  <div className="text-center pt-6 pb-3">
                    <p>
                      Please wait while the API request is being processed. <br/>
                      If the loading persists, please try selecting your language again. <br/>
                      If the API call fails, you may have selected the wrong language.
                    </p>
                  </div>
                )}

                {/* Show begin button only when language is selected. */}
                {language && !isAPILoading && (
                  <div className="flex justify-between pt-6">
                    <p>Selected language: {language}</p>
                    <button className={buttonClass}
                      onClick={() => {
                        setIntroScreen(false);
                        setCurrentMistakeIndex(0);
                      }}
                    >
                      Begin
                    </button>
                  </div>
                )}
              </>
            )}

            {/* No spelling mistakes detected. */}
            {!introScreen && dataMatches.length === 0 && (
              <div>
                <BackButton/>
                <div className="pt-4">
                  <h1 className="text-center text-lg font-semibold pt-4 pb-4">
                    No spelling mistakes detected.
                  </h1>

                  <p>
                    Well done! The text analysis API could not pick up on any obvious grammatical
                    errors or spelling mistakes. Your attention to detail and strong command of
                    spelling have resulted in a flawless piece of writing.

                    {/* Spelling bee badge. */}
                    <div className="flex justify-center pt-4">
                      <div style={{
                          height: '300px', position: 'relative',
                          top: '-10px', left: '-130px', // Adjust positioning to taste
                      }}>
                        {/* Is hardcoded greener?*/}
                        <ScaledBadge
                          resizeFactor={0.8}
                          pictureUrl={`/badges/2.png`}
                          title={"Spelling Bee"}
                          description={"Awarded for handing in an assignment with no spelling errors."}
                          commentary={'no comment'}
                          xp={String("200")}
                          unlocked={true} />
                      </div>
                    </div>

                    We are thrilled to award you with a special badge to commemorate your
                    exceptional achievement. This badge signifies your mastery of spelling and
                    serves as a testament to your dedication to excellence in writing. You can
                    proudly display this badge on your profile page, to showcase your
                    accomplishment.
                    <br/><br/>

                    Congratulations once again on your remarkable achievement and the
                    well-deserved badge!
                  </p>
                  <div className="flex justify-end">
                    <button className={buttonClass} onClick={handleCloseModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!introScreen && !outroScreen && dataMatches.length > 0 &&
             currentMistakeIndex < dataMatches.length && (
              <div>
                <BackButton/>
                <div className="pt-4">
                  <div>
                    {/* Progress. */}
                    <span>{currentMistakeIndex + 1}/{dataMatches.length}</span>

                    {/* Title for the current mistake. */}
                    <h1 className="text-center text-lg font-semibold">
                      {dataMatches[currentMistakeIndex].shortMessage || "Possible mistake found"}
                    </h1>

                    {/* The sentence containing the mistake */}
                    <p>Found in:</p>
                    <p className="text-center pt-4 pb-4">
                      <span>
                        {dataMatches[currentMistakeIndex].context.text.substring(
                          0, dataMatches[currentMistakeIndex].context.offset)}

                        {/* Highlight the incorrect word. */}
                        {usedReplacements[currentMistakeIndex] === undefined && (
                          <strong className="font-bold bg-orange-300 rounded-md px-2 py-1">
                          {dataMatches[currentMistakeIndex].context.text.substring(
                            dataMatches[currentMistakeIndex].context.offset,
                            dataMatches[currentMistakeIndex].context.offset +
                            dataMatches[currentMistakeIndex].context.length
                          )}
                          </strong>
                        )}

                        {/* Replace with suggestion if one is selected. */}
                        {(usedReplacements[currentMistakeIndex]) && (
                          <strong className="font-bold bg-green-300 rounded-md px-2 py-1">
                            {usedReplacements[currentMistakeIndex]}
                          </strong>
                        )}

                        {dataMatches[currentMistakeIndex].context.text.substring(
                          dataMatches[currentMistakeIndex].context.offset +
                          dataMatches[currentMistakeIndex].context.length
                        )}
                      </span>
                    </p>
                    <p><b>Clarification:</b> {dataMatches[currentMistakeIndex].message}</p>

                    {/* Suggestions */}
                    {dataMatches[currentMistakeIndex].replacements
                      .filter((replacement) => !isAcronym(replacement.value))
                      .slice(0, maxSuggestions)
                      .length > 0 && (
                        <>
                          <br/><p><b>Did you mean:</b></p>
                          <div className="flex-container flex-wrap space-x-2 justify-start">
                            {dataMatches[currentMistakeIndex].replacements
                              .filter((replacement) => !isAcronym(replacement.value))
                              .slice(0, maxSuggestions)
                              .map((replacement, index) => (
                                <button
                                  className="bg-fuchsia-300 hover:bg-fuchsia-400 text-white transition-all font-bold py-2 px-4 border-b-4 border-fuchsia-500 hover:border-fuchsia-500 rounded-lg items-center mx-2"
                                  key={index} onClick={() => replace(replacement.value)}
                                >
                                  {replacement.value}
                                </button>
                              ))
                            }
                          </div>
                        </>
                      )
                    }

                    {/* Show more suggestions. */}
                    {maxSuggestions < numOfSuggestions(dataMatches) &&
                      <div className="flex justify-center gap-10 pt-4">
                        <button
                          className={buttonClass}
                          onClick={() => {setMaxSuggestions(maxSuggestions + 15);}}>
                          Show more suggestions ({numOfSuggestions(dataMatches) - maxSuggestions} left)
                        </button>
                        <button
                          className={buttonClass}
                          onClick={() => {setMaxSuggestions(numOfSuggestions(dataMatches));}}>
                          Show all
                        </button>
                      </div>
                    }
                  </div>
                </div>

                {/* Next and previous buttons. */}
                <div className="flex justify-between pt-6">
                  <button className={buttonClass}  // 'Previous' Button.
                    onClick={() =>{
                      if (currentMistakeIndex === 0) { resetValues(); }  // Back to intro screen.
                      else {setCurrentMistakeIndex((prevIndex) => prevIndex - 1)}
                      setMaxSuggestions(6);
                    }}
                  >
                    Previous
                  </button>
                  <button className={buttonClass}  // 'Next' button.
                    onClick={ () => {
                      if (currentMistakeIndex === dataMatches.length - 1 ||
                          dataMatches.length === 0) {
                        setOutroScreen(true);
                      }
                      setCurrentMistakeIndex((prevIndex) => prevIndex + 1);
                      setMaxSuggestions(6);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {outroScreen && (
              <div>
                <BackButton/>
                <div>
                  <h1 className="text-center text-lg font-semibold pt-4 pb-4">
                    Congratulations on completing the Spelling Revision Quiz!
                  </h1>
                  <p>
                    By participating in this quiz, you have taken an important step towards
                    improving your spelling and grammar skills. Through careful analysis and
                    consideration of the suggested revisions, you have actively engaged in the
                    process of enhancing your writing abilities.
                    <br/><br/>
                    We hope that this quiz has provided you with valuable insights into common
                    spelling errors and equipped you with the knowledge to make more accurate and
                    confident choices in your writing.
                    <br/><br/>
                    Remember, learning is a continuous journey, and refining your skills takes
                    practice and perseverance. Take the lessons you've learned here and apply them
                    to your future writing endeavors.
                    <br/><br/>
                    We applaud your commitment to self-improvement and congratulate you on your
                    achievement. Keep up the great work!
                  </p>
                </div>

                {/* Previous and close button. */}
                <div className="flex justify-between pt-6">
                  <button className={buttonClass}
                    onClick={ () => {
                      setOutroScreen(false);
                      setCurrentMistakeIndex((prevIndex) => prevIndex - 1);
                      setMaxSuggestions(6);
                    }}
                  >
                    Previous
                  </button>
                  <button className={buttonClass} onClick={handleCloseModal}>
                    Close
                  </button>
                </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpellingQuiz;