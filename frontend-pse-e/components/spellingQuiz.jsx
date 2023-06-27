// To do: disable buttons when api call is being processed.
import React, { useEffect, useState } from "react";
import convertPdfToText from "@/lib/pdfToText";
import { useNotification } from "@/lib/hooks/useNotification";
import languageTool from "@/lib/languageTool";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import useUser from "@/lib/hooks/useUser";
import useAuthentication from "@/lib/hooks/useAuthentication";
import { useRouter } from 'next/router';
import ScaledBadge from '@/components/badge-template/Badge';
import { filterData, filterText } from '@/lib/filterUtils';

const SpellingQuiz = ({ fileUrl, showPopup, togglePopup }) => {

  if (!showPopup) { return null; }

  const buttonClass = "px-4 py-2 mr-2 inline-block bg-gray-100 hover:bg-gray-200 " +
    "text-gray-800 text-lg font-medium rounded-full";
  const selectedButtonClass = "px-4 py-2 mr-2 inline-block bg-green-100 hover:bg-green-200 " +
    "text-gray-800 text-lg font-medium rounded-full";

  const [extractedText, setExtractedText] = useState("");
  const [introScreen, setIntroScreen] = useState(true);
  const [outroScreen, setOutroScreen] = useState(false);
  const [rejectScreen, setRejectScreen] = useState(false);
  const [language, setLanguage] = useState("");  // Selected language.?
  const { onSuccess, onError } = useNotification();
  const [currentMistakeIndex, setCurrentMistakeIndex] = useState(-1);
  const [maxSuggestions, setMaxSuggestions] = useState(6);
  const [dataMatches, setDataMatches] = useState({});
  const [isAPILoading, setIsAPILoading] = useState(false);
  let [usedReplacements, setUsedReplacements] = useState([]);
  const [isBeeBadgePresent, setIsBeeBadgePresent] = useState(false);
  const [isSpellBadgePresent, setIsSpellBadgePresent] = useState(false);
<<<<<<< HEAD
  const [isProfilePictureUpdated, setIsProfilePictureUpdated] = useState(false);

=======
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [clickedOther, setClickedOther] = useState(false);
>>>>>>> b6345548920e2ddb662addab07b80b29356a3230

  const router = useRouter()
  const { courseId, assignmentId } = router.query;
  const { token } = useAuthentication()
  const { user, addUserBadges, updateUserPicture } = useUser(token)
  const beeBadgeId = 2;
  const spellBadgeId = 14;

  // Check if the user has received the badge already for this assignment.
  const checkBadgePresent = (badgeId) => {
    const presence = user?.badges.some(
      badge => (
        badge.badgeId === badgeId &&
        badge.courseId === parseInt(courseId) &&
        badge.assignmentId === parseInt(assignmentId)
      )
    );
    if (badgeId === beeBadgeId) {
      setIsBeeBadgePresent(presence);
    } else {
      setIsSpellBadgePresent(presence);
    }
    return presence;
  }

  const handleAddBadge = (badgeNumber) => {
    if (!checkBadgePresent(badgeNumber)) {
      onSuccess("Congratulations you have received a badge! View your profile to see it.");
      addUserBadges([badgeNumber], courseId, assignmentId, '', '', token);
    }
  }

  useEffect(() => {
    if (isProfilePictureUpdated) {
      // Reset the state
      setIsProfilePictureUpdated(false);
    }
  }, [isProfilePictureUpdated]);

  const handleChooseProfilePicture = async (badgeId) => {
    await updateUserPicture(badgeId, token);
  };

  // Extract text from pdf.
  useEffect(() => {
    const fetchPdfText = async () => {
      const pdfText = await convertPdfToText(fileUrl);
      const filteredText = filterText(pdfText);

      if (filteredText.length >= 30000) {
        setIntroScreen(false);
        setRejectScreen(true);
      }

      setExtractedText(filteredText);
    };

    fetchPdfText();
  }, [fileUrl]);

  const selectLanguage = async (lang) => {
    console.log("Selected language:", lang);
    setLanguage(lang);
    setIsAPILoading(true);  // To disable start button.

    try {
      const response = await languageTool(lang, extractedText);
      console.log("Detected language:", response.language.detectedLanguage);
      setDetectedLanguage(response.language.detectedLanguage);
      setDataMatches(filterData(response, user?.name));
      setIsAPILoading(false); // Enable start button after API call is done.

      // Initialize/resize the array with replacements chosen by user.
      setUsedReplacements(Array(response.matches.length).fill(undefined));
    } catch (error) {
      onError("LanguageTool API call failed: use detected language");

      // Wrongly selected language can cause API call fail, so detect language.
      selectLanguage('en');
      setClickedOther(true);
    }
  };

  const resetValues = () => {
    setIntroScreen(true);
    setOutroScreen(false);
    setCurrentMistakeIndex(-1);
    setMaxSuggestions(6);
    setClickedOther(false);
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

  const LanguageButton = ({ language, langCode, longCode, langText, flagClass }) => (
    <button className={language.includes(langCode) ? selectedButtonClass : buttonClass}
      onClick={ () => {
        selectLanguage(longCode);
        setClickedOther(false);
      }}
      disabled={isAPILoading}
      style={isAPILoading ? { opacity: 0.5 } : {}}
    >
      {langText} <span className={`fi fi-${flagClass}`}></span>
    </button>
  );

  // The number of suggested replacements for our current mistake.
  const numOfSuggestions = (dataMatches) =>
    dataMatches[currentMistakeIndex].replacements.length || 0;

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

            {rejectScreen && (
              <div>
                <h1 className="text-center text-lg font-semibold pt-4 pb-4">
                  No spelling check possible.
                </h1>
                <p>
                  Unfortunately large files cannot be processed at this time
                  as we are limited by the usage of a free API service with
                  some limitations.
                  <br/>
                  We encourage you to refer to other spell checkers to
                  complement your proofreading process and to take the time
                  to review your work and correct any mistakes manually,
                  paying attention to spelling, grammar, and overall
                  coherence. Remember, proofreading is an essential part of
                  the writing process and contributes to the refinement of
                  your ideas.
                </p>
                <div className="flex justify-end">
                  <button className={buttonClass} onClick={handleCloseModal}>
                    Close
                  </button>
                </div>
              </div>
            )}

            {introScreen && (
              <>
                <div>
                  <h1 className="text-center text-lg font-semibold pt-4 pb-4">
                    Welcome to the Spelling Revision Quiz!
                  </h1>
                  <p>
                    Improve your writing skills with this quiz designed to correct spelling errors
                    in your assignments. Our text analysis API suggests revisions on your work,
                    but remember that language is subjective, and the API may not always be
                    accurate. There might also be some inaccuracies caused by extracting the text
                    from your assignment. Especially mathematical formulas can cause inaccuracies
                    in this.
                    <br /><br />
                    Engage actively with the quiz, use its suggestions to see if they fit,
                    and discuss any disagreements with your peers. Collaboration and critical
                    thinking are key to refining your writing abilities.
                    <br /><br />
                    Let's enhance your spelling skills together!
                    <br /><br />
                    <b>To start, select the language in which you've written your assignment:</b>
                  </p>
                </div>

                {/* Language selection. */}
                <div className="flex justify-center space-x-5 mt-4">

                  <LanguageButton language={language} langCode="en-US" longCode={"en-US"}
                                  langText="English (US)" flagClass="us" />

                  <LanguageButton language={language} langCode="en-GB" longCode={"en-GB"}
                                  langText="English (UK)" flagClass="gb" />

                  <LanguageButton language={language} langCode="nl" longCode={"nl-NL"}
                                  langText="Dutch (NL)" flagClass="nl" />

                  <button className={ buttonClass }
                    onClick={() => {
                      selectLanguage('en');
                      setClickedOther(true);
                    }}
                    disabled={isAPILoading}
                    style={isAPILoading ? { opacity: 0.5 } : {}}
                  >
                    Other
                  </button>

                </div>
                {language && !clickedOther && (
                  <div className="flex justify-center">
                    <p>Selected language: {language}</p>
                  </div>
                )}
                {clickedOther && (
                  <div className="flex justify-center">
                    <p>Select detected language</p>
                  </div>
                ) }

                {isAPILoading && (
                  <div className="text-center pt-6 pb-3">
                    <span // Animated loading circle.
                      className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    />
                    <p>
                      Please wait while the API request is being processed. <br />
                      If the API call fails, you may have selected the wrong language.
                    </p>
                  </div>
                )}

                {/* Show begin button only when language is selected. */}
                {language && !isAPILoading && (
                  <div className="flex justify-between pt-6">
                    {!language.includes(detectedLanguage.code) && (
                      <button onClick={() => {
                        selectLanguage(detectedLanguage.code);
                        setClickedOther(false);
                      }}
                        className={buttonClass}
                      >
                        Use detected language: {detectedLanguage.name}
                      </button>
                    )}
                    {language.includes(detectedLanguage.code) && (<div className="flex1"/ >)}

                    {!clickedOther && (
                      <button className={buttonClass}
                        onClick={() => {
                          setIntroScreen(false);
                          setCurrentMistakeIndex(0);

                          // Give spelling bee badge when no mistakes detected.
                          if (dataMatches.length === 0) {
                            setOutroScreen(true);
                            handleAddBadge(beeBadgeId);
                          }
                        }}
                      >
                        Begin
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            {/* No spelling mistakes detected. */}
            {!introScreen && dataMatches.length === 0 && (
              <div>
                <BackButton />
                <div className="pt-4">
                  <h1 className="text-center text-lg font-semibold pt-4 pb-4">
                    No spelling mistakes detected.
                  </h1>
                  <p>
                    Well done! The text analysis API could not pick up on any obvious grammatical
                    errors or spelling mistakes. Your attention to detail and strong command of
                    spelling have resulted in a flawless piece of writing.
                  </p>
                  <div className="flex justify-center pt-4">
                    <div style={{
                      height: '300px', position: 'relative',
                      top: '-10px', left: '-130px',
                    }}>
                      <ScaledBadge
                        resizeFactor={0.8}
                        pictureUrl={`/badges/${beeBadgeId}.png`}
                        title={"Spelling Bee"}
                        description={"Awarded for handing in and revising an" +
                          " assignment with no apparent spelling errors."}
                        commentary={'no comment'}
                        xp={String("200")}
                        unlocked={true}
                        onChooseProfilePicture={() => handleChooseProfilePicture(beeBadgeId)}
                        setIsProfilePictureUpdated={setIsProfilePictureUpdated}
                      />
                    </div>
                  </div>
                  {(!isBeeBadgePresent) && (
                    <p>
                      We are thrilled to award you with a special badge to commemorate your
                      exceptional achievement. This badge signifies your mastery of spelling and
                      serves as a testament to your dedication to excellence in writing. You can
                      proudly display this badge on your profile page, to showcase your
                      accomplishment.
                      <br /><br />
                      Congratulations once again on your remarkable achievement and the
                      well-deserved badge!
                    </p>
                  )}
                  {(isBeeBadgePresent) && (
                    <p>
                      Even though you have already been awarded a badge for this
                      assignment, we encourage you to maintain your high standards and continue
                      submitting impeccable work. Your consistent attention to detail and mastery
                      of spelling play a vital role in showcasing your writing prowess.
                    </p>
                  )}
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
                  <BackButton />
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
                          {/* Sentence before the mistake. */}
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

                          {/* Rest of sentence. */}
                          {dataMatches[currentMistakeIndex].context.text.substring(
                            dataMatches[currentMistakeIndex].context.offset +
                            dataMatches[currentMistakeIndex].context.length
                          )}
                        </span>
                      </p>
                      <p><b>Clarification:</b> {dataMatches[currentMistakeIndex].message}</p>

                      {/* Suggestions */}
                      {dataMatches[currentMistakeIndex].replacements
                        .slice(0, maxSuggestions).length > 0 && (
                          <>
                            <br /><p><b>Did you mean:</b></p>
                            <div className="flex-container flex-wrap space-x-2 justify-start">
                              {dataMatches[currentMistakeIndex].replacements
                                .slice(0, maxSuggestions)
                                .map((replacement, index) => (
                                  <button
                                    className="bg-fuchsia-300 hover:bg-fuchsia-400 text-white
                                             transition-all font-bold py-2 px-4 border-b-4
                                             border-fuchsia-500 hover:border-fuchsia-500
                                             rounded-lg items-center mx-2"
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
                            onClick={() => { setMaxSuggestions(maxSuggestions + 15); }}>
                            Show more suggestions
                            ({numOfSuggestions(dataMatches) - maxSuggestions} left)
                          </button>
                          <button
                            className={buttonClass}
                            onClick={() => { setMaxSuggestions(numOfSuggestions(dataMatches)); }}>
                            Show all
                          </button>
                        </div>
                      }
                    </div>
                  </div>

                  {/* Next and previous buttons. */}
                  <div className="flex justify-between pt-6">
                    <button className={buttonClass}  // 'Previous' Button.
                      onClick={() => {
                        if (currentMistakeIndex === 0) { resetValues(); }  // Back to intro screen.
                        else { setCurrentMistakeIndex((prevIndex) => prevIndex - 1) }
                        setMaxSuggestions(6);
                      }}
                    >
                      Previous
                    </button>
                    <button className={buttonClass}  // 'Next' button.
                      onClick={() => {

                        // Give spellmaster badge on finishing quiz.
                        if (currentMistakeIndex === dataMatches.length - 1) {
                          setOutroScreen(true);
                          handleAddBadge(spellBadgeId);
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

            {outroScreen && !(dataMatches.length === 0) && (
              <div>
                <BackButton />
                <div>
                  <h1 className="text-center text-lg font-semibold pt-4 pb-4">
                    Congratulations on completing the Spelling Revision Quiz!
                  </h1>
                  <p>
                    By participating in this quiz, you have taken an important step towards
                    improving your spelling and grammar skills. Through careful analysis and
                    consideration of the suggested revisions, you have actively engaged in the
                    process of enhancing your writing abilities.
                  </p>

                  <div className="flex justify-center pt-4">
                    <div style={{
                      height: '300px', position: 'relative',
                      top: '-10px', left: '-130px',
                    }}>
                      <ScaledBadge
                        resizeFactor={0.8}
                        pictureUrl={`/badges/${spellBadgeId}.png`}
                        title={"Spellmaster"}
                        description={"Awarded to students who show exemplary initiative and " +
                          "interest in their own improvement by completing the " +
                          "spelling revision quiz."}
                        commentary={'no comment'}
                        xp={String("200")}
                        unlocked={true}
                        onChooseProfilePicture={() => handleChooseProfilePicture(spellBadgeId)}
                        setIsProfilePictureUpdated={setIsProfilePictureUpdated}
                      />
                    </div>
                  </div>
                  {(!isSpellBadgePresent) && (
                    <p>
                      We are thrilled to award you with a special badge that signifies your
                      dedication to improving your writing. You can proudly display this badge on
                      your profile page, to showcase your commitment to self-improvement.
                    </p>
                  )}
                  {(isSpellBadgePresent) && (
                    <p>
                      Even though you have already been awarded this badge for this assignment, we
                      encourage you to maintain your high standards and continue revising your
                      work, as it plays a vital role in enhancing your writing abilities.
                    </p>
                  )}
                  <p>
                    <br />
                    We hope that this quiz has provided you with valuable insights into common
                    spelling errors and equipped you with the knowledge to make more accurate and
                    confident choices in your writing.
                    <br /><br />
                    Remember, learning is a continuous journey, and refining your skills takes
                    practice and perseverance. Take the lessons you've learned here and apply them
                    to your future writing endeavors. Keep up the great work!
                  </p>
                </div>

                {/* Previous and close button. */}
                <div className="flex justify-between pt-6">
                  <button className={buttonClass}
                    onClick={() => {
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