class Calculator{
    constructor(){
        this.display = document.getElementById('display')
        this.keys = document.getElementById('keys')
        this.currentInput = '0'
        this.previousInput = ''
        this.operation = null
        this.shouldResetScreen = false

        this.init()
    }

    init(){
        this.updateDisplay()
        this.setupEventListeners()
    }

    setupEventListeners(){
        //Button clicks
        this.keys.addEventListener('click', (e) => {
            if(!e.target.matches('button')) return

            const { value } = e.target.dataset

            if(value === 'C'){
                this.clear()
            }
            else if(value === 'backspace'){
                this.backspace()
            }
            else if(value === '±'){
                this.negate()
            }
            else if(value === '%'){
                this.percentage()
            }
            else if(value === '='){
                this.calculate()
            }
            else if(['+', '-', '*', '/'].includes(value)){
                this.handleOperator(value)
            }
            else if(value == '.'){
                this.appendDecimal()
            }
            else{
                this.appendNumber(value)
            }

            this.updateDisplay()
        })

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if(e.key >= '0' && e.key <= '9'){
                this.appendNumber(e.key)
            }
            else if(e.key === '.'){
                this.appendDecimal()
            }
            else if(['+', '-', '*', '/'].includes(e.key)){
                this.handleOperator(e.key)
            }
            else if(e.key === 'Enter' || e.key === '='){
                this.calculate()
            }
            else if(e.key === 'Escape'){
                this.clear()
            }
            else if(e.key === 'Backspace'){
                this.backspace()
            }
            else if(e.key === '%'){
                this.percentage()
            }

            this.updateDisplay()
            e.preventDefault()
        })
    }

    appendNumber(number){
        if(this.currentInput === '0' || this.shouldResetScreen){
            this.currentInput = number
            this.shouldResetScreen = false
        }
        else {
            this.currentInput += number
        }
    }

    appendDecimal(){
        if(this.shouldResetScreen){
            this.currentInput = '0.'
            this.shouldResetScreen = false
            return
        }

        if(!this.currentInput.includes('.')){
            this.currentInput += '.'
        }
    }

    handleOperator(op){
        if(this.operation !== null) this.calculate()
        this.previousInput = this.currentInput
        this.operation = op
        this.shouldResetScreen = true
    }

    calculate(){
        if(this.operation === null || this.shouldResetScreen) return;

        let computation
        const prev = parseFloat(this.previousInput)
        const current = parseFloat(this.currentInput)

        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
        }
    }
}

// const keys = document.getElementById('keys')
// keys.addEventListener('click', (e) => {
//             console.log(e)
//         })