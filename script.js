class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    } 

   

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
       
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                if (current === 0) {
                    alert('error') 
                  } else {
                computation = prev / current
                  }
                break
            case '^':
                computation = prev ** current
                break
            default: 
                return
        }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
    }

    sqrt() {
        if (this.currentOperand < 0) {
            alert('error')
        }
		this.currentOperand = Math.sqrt(this.currentOperand)
    }


    getDisplayNumber(number) {
        const roundNumber = Math.round(number * 10000000000) / 10000000000
        const stringNumber = roundNumber.toString().substring(0,11)
        const stringInteger = stringNumber.split('.')[0]
        if (stringInteger.length > 10) {
            stringInteger = stringInteger.substring(0,10)
        }
        const integerDigits = parseFloat(stringInteger)

        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else { 
            integerDisplay = integerDigits.toLocaleString('lt', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
       
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
             `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }

        
    }

    addNegativeSign() {
        if (this.currentOperand === '') return
		this.currentOperand = parseFloat(this.currentOperand) * -1
    }

    
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const sqrtButton = document.querySelector('[data-sqrt]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const negativeButton = document.querySelector('[data-negative]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

sqrtButton.addEventListener('click', button => {
    calculator.sqrt()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

negativeButton.addEventListener('click', button => {
    calculator.addNegativeSign()
    calculator.updateDisplay()
})