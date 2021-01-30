
// CALCULATOR CONSTRUCTOR

class Calculator {
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clearAll()
    }

    clearAll(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operator = undefined
    }
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    selectOperator(operator){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        // if operator === "÷"

    }

    calculate(){
        let calculation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        if (this.operator === '+') calculation = prev + current
        else if (this.operator === '÷') calculation = prev / current
        else if (this.operator === '*') calculation = prev * current
        else if (this.operator === '-') calculation = prev - current
        else return

        this.currentOperand = calculation
        this.operator = undefined
        this.previousOperand = ''
    }
    
    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand
        this.previousOperandText.innerText = this.previousOperand

    }
}


// CONSTANTS

const numbers = document.querySelectorAll('[data-number]')
const operators = document.querySelectorAll('[data-operator]')
const equals = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandText = document.querySelector('.previous-operand')
const currentOperandText = document.querySelector('.current-operand')

const calculator = new Calculator(previousOperandText, currentOperandText)


// EVENT LISTENERS

numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText)
        calculator.updateDisplay()        
    })
})

operators.forEach(operator  => {
    operator.addEventListener('click', () => {
        calculator.selectOperator(operator.innerText)
        calculator.updateDisplay() 
    })
})

clearButton.addEventListener('click', () => {
    calculator.clearAll()
    calculator.updateDisplay()
})

equals.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})


