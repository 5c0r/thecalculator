import { ButtonLabels } from "./ButtonLabels";
import { number } from "prop-types";

const Big = require('big.js');

export class CalculationHistory {
    Calculation: string;
    Result: string;
    Timestamp: string;
}

// Most of the functionality quite inspired from here
export class CalculatorState {

    // History , or most recent calculation ?! 
    history: CalculationHistory[] = [];

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

    public onNumberClick(number: any): void {
        if (this.current === "0" && (number === "0" || number === 0)) return;

        if (this.operator) {
            if (this.current) {
                if (this.current === "0") this.setNumber(number);
                else this.addNumber(number);
            } else {
                if (this.current === "0") this.setNumber(number);
                else this.setNumber(number);
            }

        }
        // No operator 
        else if (this.current) {
            if (this.current === "0") this.setNumber(number);
            else this.addNumber(number);
        } else {
            this.setNumber(number);
        }
    }

    private setNumber(number: any): void {
        this.current = number.toString();
    }

    private addNumber(number: any): void {
        this.current = this.current.toString() + number.toString();
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
        this.current = "0";
    }

    onSpecialOperator(button: ButtonLabels): void {
        switch (button) {
            case ButtonLabels.Delete: {
                const numberToDelete = this.operator !== null ? this.current : (this.total || this.current);

                let deleteNumber = numberToDelete === "0" ? "0"
                    : numberToDelete.substring(0, numberToDelete.length - 1);

                if (deleteNumber === "-") deleteNumber = "0";

                // TODO: This can be refactored
                if (this.operator) {
                    if (this.current) this.setNumber(deleteNumber);
                }
                else {
                    if (this.current) this.setNumber(deleteNumber);
                    else if (this.total) this.total = deleteNumber;
                }

                break;
            }
            case ButtonLabels.Negate: {
                // TODO: Maybe users wants to negate the result then continue calculation - Done
                const numberToNegate = this.operator !== null ? this.current : (this.total || this.current);
                if (numberToNegate === null || numberToNegate === "0") return;

                const negatedNumber = numberToNegate.indexOf("-") === 0
                    ? numberToNegate.substr(1, numberToNegate.length) : ("-" + numberToNegate);

                // TODO: This ca nbe refactored
                if (this.operator) {
                    if (this.current) this.setNumber(negatedNumber);
                }
                else {
                    if (this.current) this.setNumber(negatedNumber);
                    else if (this.total) this.total = negatedNumber;
                }
                break;
            }
            case ButtonLabels.Decimal: {
                const numberToDecimal = (this.operator !== null ? this.current : (this.current || this.total)) || "0";

                const decimalSignIndex = numberToDecimal.indexOf(".");
                if (decimalSignIndex > -1) return;
                const decimalNumber = numberToDecimal + ".";

                // TODO: This is likely different from above
                if (this.operator) {
                    this.setNumber(decimalNumber);
                }
                else {
                    if (this.current || this.CurrentNumber === 0) this.setNumber(decimalNumber);
                    else if (this.total) this.total = decimalNumber;
                }
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

        this.total = result.toString();

        if (publishResult) {
            this.history.push({
                Calculation: this.calculation,
                Result: this.total,
                Timestamp: new Date().toISOString()
            });

            this.operator = null;
            this.current = null;
            this.calculation = '';
        }
    }

    resetAll() {
        this.calculation = '';
        this.current = "0";
        this.total = null;
        this.operator = null;
    }
}