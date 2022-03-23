function add(num1, num2) {
    console.log(`${num1} + ${num2}`)
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 == 0) throw 'Cannot Divide By 0!';
    return num1 / num2;
}

function populateScreen(num) {
    if (resetFlag == true) {
        screen.innerText = num;
        resetFlag = false;
    } else {
        screen.innerText += num;
    }
}

function prependNegativeSign() {
    if (screen.innerText == 0) {
        return
    } else if (screen.innerText[0] != "-") {
        screen.innerText = "-" + screen.innerText;
    } else {
        screen.innerText = screen.innerText.slice(1);
    }
}

function operate(num1, num2, operator) {
    try {
        if (operator == '+') return add(num1, num2);
        else if (operator == '-') return subtract(num1, num2);
        else if (operator == '*') return multiply(num1, num2);
        else if (operator == '/') return divide(num1, num2);
    } catch (e) {
        populateScreen(e);
        return e;
    }
}

let firstNum;
let currentOperator = '';
let resetFlag = true;

const screen = document.querySelector('.screen');

const clear = document.querySelector('.clear');
clear.addEventListener('click', function() {
    screen.innerText = 0;
    firstNum = undefined;
    currentOperator = '';
    resetFlag = true;
})

const numButtons = document.querySelectorAll('.num-button');
numButtons.forEach(numButton => {
    numButton.addEventListener('click', function() {
        if (numButton.value == '.' && screen.innerText.includes('.')) {
            return
        } else if (screen.innerText == firstNum) {
            resetFlag = true;
            populateScreen(numButton.value);
        } else {
            populateScreen(numButton.value);
        }
    })
})

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', function() {
        if (firstNum != undefined) {
            firstNum = operate(parseFloat(firstNum), parseFloat(screen.innerText), currentOperator);
            currentOperator = operator.value;
            resetFlag = true;
            populateScreen(firstNum);
        } else {
            firstNum = screen.innerText;
            currentOperator = operator.value;
            resetFlag = true;
        }
    })
})

const plusMinus = document.querySelector('.plus-minus');
plusMinus.addEventListener('click', function() { prependNegativeSign() });

const equal = document.querySelector('.equals');
equal.addEventListener('click', function() {
    firstNum = operate(parseFloat(firstNum), parseFloat(screen.innerText), currentOperator);
    currentOperator = '';
    resetFlag = true;
    populateScreen(firstNum);
})