let a = "";
let b = "";
let operator = "";
let operators = ["+", "-", "*", "/"];
let input = document.getElementById("input");
const buttons = document.querySelectorAll("button");
let expression = document.getElementById("expression");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    operate(e);
  });
});

function operate(e) {
  let val = e.target.textContent;

  if (val >= '0' && val <= '9') {
    if (operator === "") {
      if (val === '0' && a === '0') return;  // prevent mult. zeroes
      if (a.length >= 13) return;  // prevent 13 or more characters
      a += val;
      input.textContent = a;
    } else {
      if (val === '0' && b === '0') return;  
      if (b.length >= 13) return;  
      b += val;
      input.textContent = b;
      expression.textContent = a + " " + operator;
    }
  } else if (val === ".") {
    if (operator === "" && !a.includes(".")) {
      a += val;
      input.textContent = a;
    } else if (operator !== "" && !b.includes(".")) {
      b += val;
      input.textContent = b;
    }
  } else if (val === "+" || val === "-" || val === "*" || val === "/") {
    if (operator === "" && a !== "") {
      operator = val;
      input.textContent = a;
      expression.textContent = a + " " + operator;
    } else if (b !== "") {
      newA2(e);
    }
  } else if (val === "=") {
    if (a !== "" && b !== "" && operator !== "") {
      newA(e);
    }
  } else if (val === "CE") {
    a = "";
    b = "";
    operator = "";
    input.textContent = "";
    expression.textContent = "";
  } else if (val === "C") {
    if (a !== "" && operator !== "" && b == "") {
      a = "";
      input.textContent = null;
      b = "";
      expression.textContent = null;
      operator = "";
    }

    if (operator !== "") {
      b = b.slice(0, -1);
      input.textContent = b;
    } else if (operator === "") {
      a = a.slice(0, -1);
      input.textContent = a;
    }
  }
  /*if (input.textContent.length > 13) {
    input.textContent = "Error";
    a = "";
    b = "";
    operator = "";
    expression.textContent = "";
  }*/
}

function calculate(a, b, operator) {
  if (operator === "+") {
    return a + b;
  } else if (operator === "-") {
    return a - b;
  } else if (operator === "*") {
    return a * b;
  } else if (operator === "/") {
    if (b === 0) {
      return "Error";
    } else {
      return a / b;
    }
  }
}

function newA(e) {
  let result = calculate(parseFloat(a), parseFloat(b), operator);
  if (result.toString().length > 13) {
    input.textContent = result.toExponential(8);
    a = result.toExponential(8);
    b = "";
    operator = "";
    expression.textContent = "";
  } else {
    input.textContent = result;
    a = result.toString();
    b = "";
    operator = "";
    expression.textContent = "";
  }
}

function newA2(e) {
  let result = calculate(parseFloat(a), parseFloat(b), operator);
  if (result.toString().length > 13) {
    input.textContent = result.toExponential(4);
    a = result.toExponential(4);
    b = "";
    operator = "";
    expression.textContent = "";
  } else {
    input.textContent = result;
    a = result.toString();
    b = "";
    operator = e.target.textContent;
    expression.textContent = a + " " + operator;
  }
}