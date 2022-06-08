let integerValue = "";
let decimalValue = "";
let operator = null;
let operator2 = null;
let decimalUsed = false;
let equalsUsed = false;
let currentValue = null;
let previousValue = null;

const displayBottom = document.querySelector(".bottom");
const displayTop = document.querySelector(".top");
const keys = document.querySelectorAll(".keys button");
const clear = document.querySelector(".clear");
const remove = document.querySelector(".delete");

//Helper method for the 4 basic operations
function operators(operator, value1, value2){
    if(operator == "+"){
        return value1 + value2;
    }
    else if(operator == "-"){
        return value1 - value2;
    }
    else if(operator == "×"){
        return value1 * value2;
    }
    else if(operator == "÷"){
        return value1 / value2;
    }
}

//Stores the user's inputs and displays it
function store(e){
    temp = e.target.classList[0];
    if(temp.length > 1 && (currentValue != null || previousValue != null)){
        checkOperators(temp);
    }
    else if(temp === "."){
        checkDecimals();
    }
    else if(Number(temp) < 10){
        checkNumbers(temp);
    }
    checkTopDisplay();
    checkEquals();
}

//Checks when display values on the top half
function checkTopDisplay(){
    if(operator != null){
        if(previousValue != null){
            displayTop.textContent = `${previousValue} ${operator}`;
        }
        else{
            displayTop.textContent = `${currentValue} ${operator}`;
            previousValue = currentValue;
        }
    }
}

//Handles action when equals button is pressed
function checkEquals(){
    if(equalsUsed === true){
        previousValue = Number(operators(operator, previousValue, currentValue).toFixed(8));
        displayBottom.textContent = `${previousValue}`;
        displayTop.textContent += ` ${currentValue} =`;
        integerValue = "";
        decimalValue = "";
        operator = null;
        decimalUsed = false;
        equalsUsed = false;
    }
    else if(operator2 != null){
        previousValue = Number(operators(operator, previousValue, currentValue).toFixed(8));
        displayBottom.textContent = `${previousValue}`;
        displayTop.textContent = `${previousValue} ${operator2}`;
        integerValue = "";
        decimalValue = "";
        operator = operator2;
        operator2 = null;
    }
}

//Handles when the 4 basic operations are pressed
function checkOperators(temp){
    integerValue = "";
    decimalValue = "";
    decimalUsed = false;
    if(operator != null){
        if(temp === "multiply"){
            operator2 = "×";
        }
        else if(temp === "divide"){
            operator2 = "÷";
        }
        else if(temp === "add"){
            operator2 = "+";
        }
        else if(temp === "subtract"){
            operator2 = "-";
        }
        else if(temp === "equals"){
            if(previousValue != null && currentValue != null){
                equalsUsed = true;
            }
        }
    }
    else{
        if(temp === "multiply"){
            operator = "×";
        }
        else if(temp === "divide"){
            operator = "÷";
        }
        else if(temp === "add"){
            operator = "+";
        }
        else if(temp === "subtract"){
            operator = "-";
        }
    }
}

function checkDecimals(){
    if(decimalUsed == false){
        if(integerValue === ""){
            integerValue = "0";
        }
        decimalUsed = true;
        currentValue  = parseFloat(integerValue);
        displayBottom.textContent = `${integerValue}.`;
    }
    if(operator === null){
        previousValue = null;
        displayTop.textContent = "";
    }
}

//Handles when the numbers are pressed
function checkNumbers(temp){
    if(decimalUsed === true){
        decimalValue += temp;
        currentValue = parseFloat(`${integerValue}.${decimalValue}`);
        displayBottom.textContent = `${integerValue}.${decimalValue}`;
    }
    else{
        if(operator === null){
            previousValue = null;
            displayTop.textContent = "";
        }
        integerValue += temp;
        currentValue = parseFloat(`${integerValue}`);
        displayBottom.textContent = integerValue;
    }
}

//Clears all values
function clearThis(){
    integerValue = "";
    decimalValue = "";
    operator = null;
    decimalUsed = false;
    equalsUsed = false;
    currentValue = null;
    previousValue = null;
    displayTop.textContent = "";
    displayBottom.textContent = 0;
}

//Removes the latest value on the screen
function removeThis(){
    if(decimalValue === ""){
        if(decimalUsed === true){
            displayBottom.textContent = `${integerValue}`;
            decimalUsed = false;
        }
        else{
            integerValue = integerValue.slice(0, -1);
            currentValue = parseFloat(`${integerValue}`);
            displayBottom.textContent = `${integerValue}`;
        }
    }
    else{
        decimalValue = decimalValue.slice(0, -1);
        currentValue = parseFloat(`${integerValue}.${decimalValue}`);
        displayBottom.textContent = `${integerValue}.${decimalValue}`;
    }
    if(decimalValue === "" && integerValue === ""){
        displayBottom.textContent = 0;
    }
}

keys.forEach(key => key.addEventListener("click", store));
clear.addEventListener("click", clearThis);
remove.addEventListener("click", removeThis);
