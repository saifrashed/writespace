// TO DO: find good regex pattern(s) for math formulas.

function filterMathText(text) {

  const mathFormulaPattern = /\b([\w\s\d+\-*\/=^().,]+)\b/;
  // const mathFormulaPattern = /\([^()]+\)/g; // Regular expression pattern to match math formulas enclosed within parentheses

  // Exclude math formulas from the text
  let filteredText = text.replace(mathFormulaPattern, '');

  // Trim extra spaces
  filteredText = filteredText.trim();

  return filteredText;
}

// Example usage
const inputText = "Wiskunde formule: ( C . x + 3 - 4 ) Eind.";
console.log("input text:", inputText)
const filteredText = filterMathText(inputText);
console.log("math filtered:", filteredText); // Output: "Wiskunde formule: Eind."

