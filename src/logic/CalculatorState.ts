import { ButtonLabels } from "./ButtonLabels";

const Big = require('big.js');

// Most of the functionality quite inspired from here
export class CalculatorState {

    calculation: string = '';

    get displayString() {
        return this.calculation + (this.operator || '');
    }

    current: string = null;
    total: string = null;
    operator: any = null;

    get CurrentNumber() {
        return this.current !== null ? Big(this.current) : 0;
    }

    public addNumber(number: any): void {
        if (this.CurrentNumber === 0 && (number === "0" || number === 0)) return;

        if (this.operator) {
            if (this.current) {
                this.current = this.current.toString() + number.toString();
            } else {
                this.current = number;
            }

        }
        // No operator 
        else if (this.current) {
            this.current = this.current.toString() + number.toString();
        } else {
            this.current = number.toString();
        }
    }

    setOperator(operator: string): void {
        if (this.operator) {
            if (this.current) {
                // TODO:
                this.calculation += ` ${this.operator} ${this.current} `;
                this.calculate(false);
            }
        }
        else if (this.current) {
            this.total = this.current;
            this.calculation += ` ${this.current} `
        } else {
            this.calculation += this.total || "0";
        }

        this.current = null;
        this.operator = operator;
    }

    resetCurrent(): void {
        this.current = null;
    }

    onSpecialOperator(button: ButtonLabels): void {
        switch (button) {
            case ButtonLabels.Negate: {
                // TODO: Maybe users wants to negate the result then continue calculation
                const numberToNegate = this.total || this.current;
                if (numberToNegate === null || numberToNegate === "0") return;

                const negatedNumber = numberToNegate.indexOf("-") === 0
                    ? numberToNegate.substr(1, numberToNegate.length) : ("-" + numberToNegate);

                if (this.current) this.current = negatedNumber;
                else if (this.total) this.total = negatedNumber;

                break;
            }
        }
    }

    calc(firstStr: string, secondStr: string, operator: any) {
        const first = firstStr ? Big(firstStr) : Big(0);
        const second = secondStr ? Big(secondStr) : Big(0);

        let result = 0;

        switch (operator) {
            case ButtonLabels.Add: {
                result = first.plus(second);
                break;
            }
            case ButtonLabels.Multiple:
                result = first.times(second);
                break;
            case ButtonLabels.Substract:
                result = first.minus(second);
                break;
            case ButtonLabels.Divide:
                result = first.div(second);
                break;
            default:
                break;
        }

        return result;
    }

    calculate(publishResult: boolean = false): void {

        if (this.operator === null || this.current === null) return;

        var result = 0;

        if (publishResult) this.calculation += ` ${this.operator} ${this.current} `;

        result = this.calc(this.total, this.current, this.operator);

        console.log('RESULT', result.toString());
        this.total = result.toString();

        if (publishResult) {
            this.operator = null;
            this.current = null;
            this.calculation = '';
        }
    }

    resetAll() {
        this.calculation = '';
        this.current = null;
        this.total = null;
        this.operator = null;
    }
}