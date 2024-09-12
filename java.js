// Calculator logic
const display = document.querySelector(".display");
let currentInput = "";
let operator = "";
let hasOperator = false;
let isNegative = false;
let isFirstNumber = true;
let hasLeadingZero = false;

// Function to append a number to the display
function appendNumber(number) {
  // Prevent multiple leading zeros
  if (isFirstNumber && number === "0" && hasLeadingZero) {
    return;
  }

  // Handle negative numbers
  if (isNegative) {
    currentInput = "-" + number;
    isNegative = false;
  } else {
    currentInput += number;
  }

  // Update display and reset flags
  display.textContent = currentInput;
  isFirstNumber = false;
  if (number === "0" && isFirstNumber) {
    hasLeadingZero = true;
  } else {
    hasLeadingZero = false;
  }
}

// Function to append an operator to the display
function appendOperator(newOperator) {
  // Prevent multiple operators
  if (!hasOperator) {
    operator = newOperator;
    currentInput += operator;
    display.textContent = currentInput;
    hasOperator = true;
    isFirstNumber = true;
    hasLeadingZero = false;
  }
}

// Function to calculate the result
function calculate() {
  try {
    // Handle error for 0 + 0
    if (currentInput === "0+0") {
      display.textContent = "Error";
    } else {
      // Evaluate the expression and display the result
      let result = eval(currentInput);
      if (result < 0) {
        display.textContent = `-${Math.abs(result)}`;
      } else {
        display.textContent = result.toString();
      }
    }
    // Reset flags
    hasOperator = false;
    operator = "";
  } catch (error) {
    display.textContent = "Error";
  }
}

// Function to clear the display and reset variables
function clearDisplay() {
  currentInput = "";
  display.textContent = "0";
  hasOperator = false;
  operator = "";
  isNegative = false;
  isFirstNumber = true;
  hasLeadingZero = false;
}

// Event listener for keyboard input
window.addEventListener("keydown", (event) => {
  const key = event.key;

  // Handle minus sign
  if (key === "-") {
    if (currentInput.endsWith("-")) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput += "-";
      display.textContent = currentInput;
    }
  } else if (key >= "0" && key <= "9") {
    // Append numbers
    appendNumber(key);
  } else if (["+", "*", "/"].includes(key)) {
    // Append operators
    appendOperator(key);
  } else if (key === "Enter") {
    // Calculate on Enter key
    calculate();
  } else if (key === "Backspace") {
    // Delete last character
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput;
  } else if (key === "Escape") {
    // Clear display on Escape key
    clearDisplay();
  }
});

// Event listener for button clicks
document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "BUTTON") {
    const buttonText = target.textContent;

    switch (buttonText) {
      case "C":
        clearDisplay();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        appendOperator(buttonText);
        break;
      case "=":
        calculate();
        break;
      case ".":
        if (currentInput.includes(".") || (hasOperator && isFirstNumber)) {
          break;
        } else {
          appendNumber(".");
          break;
        }
      case "DEL":
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput;
        break;
      case "RESET":
        clearDisplay();
        break;
      default:
        appendNumber(buttonText);
        break;
    }
  }
});
