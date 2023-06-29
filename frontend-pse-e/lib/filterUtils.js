// filterUtils.js
// Helper functions for the spellingQuiz.

// To filter out all the suggestions for acronyms.
const isAcronym = (value) => {
  const capitalLettersCount =
    value.split('').filter((char) => char === char.toUpperCase()).length;
  return capitalLettersCount >= 2;
};

// Returns true if a match might be for a line break hyphenation.
const falseSplit = (matchText, match) => {
  if (matchText.includes("- ")) {
    let unsplit = matchText.replace("- ", "");
    if (match.replacements.length > 0 &&
      match.replacements[0].value === unsplit) {
      return true;
    }
  }
  return false;
}

export const filterData = (inputData, username) => {

  const hasGreekSymbol = /[\u0370-\u03FF]/;
  const isCommonMathWord = /^(d+(x|y))|ln$/;  // ln, dx, ddx, dy, ddy etc.
  const isCourseCode = /^[A-Z0-9]{9}Y$/;

  // Filter out mistakes most likely caused by pdf to text conversion errors.
  inputData.matches = inputData.matches.filter((match) => {

    const { text, offset, length } = match.context;
    const matchText = text.substring(offset, offset + length);

    return (
      !match.ignoreForIncompleteSentence &&  // API detected conversion errors
      !hasGreekSymbol.test(matchText) &&
      !isCommonMathWord.test(matchText) &&
      !isCourseCode.test(matchText) &&
      !falseSplit(matchText, match) &&
      !(matchText === username)
    );
  });

  // Filter out acronyms as suggestions for a match.
  for (const match of inputData.matches) {
    match.replacements =
      match.replacements.filter((replacement) => !isAcronym(replacement.value))
  }

  return inputData.matches;
}

export const filterText = (text) => {
  if (text) {
    // Replace "a ," with "a," with "a" an alphanumeric or a greek letter.
    let pattern = /(\w|[\u0391-\u0969])\s+,/g;
    let filteredText = text.replace(pattern, "$1,");

    // Remove space after an opening bracket.
    pattern = /(\(|\[|\{)\s+(\w|[\u0370-\u03FF])/g;
    filteredText = filteredText.replace(pattern, "$1$2");

    // Remove space before a closing bracket.
    pattern = /(\w|[\u0370-\u03FF])\s+(\)|\]|\})/g;
    filteredText = filteredText.replace(pattern, "$1$2");

    // Fix umlauted vowels.
    const umlauts = {
      a: 'ä', e: 'ë', i: 'ï', o: 'ö', u: 'ü', \u0131: 'ï',
      A: 'Ä', E: 'Ë', I: 'Ï', O: 'Ö', U: 'Ü'
    };
    pattern = /¨\s+([aei\u0131ou])/gi;
    filteredText = filteredText.replace(pattern,
      (match, vowel) => umlauts[vowel.toLowerCase()] || match);

    return filteredText;
  } else {
    return ""
  }
}
