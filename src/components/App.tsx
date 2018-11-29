import * as React from "react";
import "./../assets/scss/App.scss";
import { Display } from "./Display";
import { UpperDisplay } from "./UpperDisplay";
import { ButtonPanel } from "./ButtonPanel";
import { CalculatorState } from "../logic/CalculatorState";
import { ButtonLabels } from "../logic/ButtonLabels";

export interface AppProps {

}

export interface AppState {
    calculator: CalculatorState;
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            calculator: new CalculatorState()
        }
    }

    handleClick = (button: string) => {
        // TODO: Move this to CalculatorState ? Then we can basically test it
        switch (button) {
            case ButtonLabels.C: { this.state.calculator.resetAll(); break; }
            // TODO
            case ButtonLabels.CE: { this.state.calculator.resetCurrent(); break; }
            // case ButtonLabels.Negate: { this.state.calculator.on}
            case ButtonLabels.Delete:
            case ButtonLabels.Decimal:
            case ButtonLabels.Negate: {
                this.state.calculator.onSpecialOperator(button);
                break;
            }
            case ButtonLabels.Add:
            case ButtonLabels.Multiple:
            case ButtonLabels.Divide:
            case ButtonLabels.Substract: {
                this.state.calculator.setOperator(button);
                break;
            }
            case ButtonLabels.Result: {
                this.state.calculator.calculate(true);
                console.log('TODO: Publish result here', this.state.calculator.history)
                fetch('/createsheet', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify(this.state.calculator.history),
                }).then(result => {
                    console.log('woohooo', result);
                    this.state.calculator.history = [];
                })
                break;
            }
            // Should be a button
            default: {
                this.state.calculator.addNumber(button);
                break;
            }
        }

        this.setState({
            ...this.state,
            calculator: this.state.calculator
        });
    }

    getCalculation = () => {
        return this.state.calculator.displayString;
    }

    render() {
        const currentNum = this.state.calculator.current || this.state.calculator.total || '0';
        return (
            <div className="app">
                <UpperDisplay calculation={this.getCalculation()}
                />
                <Display currentText={currentNum}
                />
                <ButtonPanel
                    currentOperator={this.state.calculator.operator}
                    handleClick={this.handleClick.bind(this)}
                />
            </div>
        );
    }
}
