let inputBox = document.querySelector('.screen');
let buttons = document.querySelectorAll('button');

let expression = '';

let pressedEqual = false;

buttons.forEach(
    (element) => {
        element.addEventListener(
            'click', (b) => {
                if(b.target.innerText === 'AC') {
                    expression = '';
                }
                else if(b.target.innerText === 'DEL') {
                    if(expression === 'NaN') {
                        expression = '';
                    }
                    else {
                        expression = expression.substring(0, expression.length - 1);
                    }
                }
                else if(b.target.innerText === '=') {
                    // catching wrong expressions
                    try {
                        expression = String(eval(expression));
                    } catch (error) {
                        expression = 'NaN';
                    }
                    // handling division by 0
                    if(expression === 'Infinity') {
                        expression = 'NaN';
                    }
                    // rounding off decimal answers to 8 places
                    else if(expression % 1 != 0) {
                        expression = parseFloat(expression).toFixed(8);
                    }
                    pressedEqual = true;
                    
                }
                
                else if(b.target.innerText === '+/-') {
                    if(expression === 'NaN') {
                        expression = '0';
                    }
                    else {
                        expression = String(-eval(expression));
                    }
                }
                else if(pressedEqual === true && (expression === 'NaN' || b.target.className != 'opr')){
                    expression = b.target.innerText;
                    pressedEqual = false;
                }
                else {
                    expression += b.target.innerText;
                    pressedEqual = false;
                }

                inputBox.value = expression;
            }
        )
    }
)