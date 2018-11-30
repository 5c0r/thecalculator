import * as React from "react";
import "./../assets/scss/App.scss";
import { Display } from "./Display";
import { UpperDisplay } from "./UpperDisplay";
import { ButtonPanel } from "./ButtonPanel";
import { CalculatorState } from "../logic/CalculatorState";
import { ButtonLabels } from "../logic/ButtonLabels";

import swal from 'sweetalert2';

export interface AppProps {

}

export interface AppState {
    calculator: CalculatorState;
    publishing: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            publishing: false,
            calculator: new CalculatorState()
        }
    }

    handleClick = async (button: string) => {
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
                break;
            }
            // Should be a button
            default: {
                this.state.calculator.onNumberClick(button);
                break;
            }
        }

        this.setState({
            ...this.state,
            calculator: this.state.calculator
        });
    }

    handlePublishClick = async () => {
        this.setState({
            ...this.state,
            publishing: true
        })
        const result = await fetch('/createsheet', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(this.state.calculator.history),
        })

        if (result.ok) {
            const spreadSheetUrl = await result.json();
            swal({
                title: 'Success !',
                html: `<p>Your calculation result:</p> 
                    <a href="${spreadSheetUrl}" target="blank"> Google Spreadsheet</a>`,
                type: 'success'
            })
            this.state.calculator.history = [];
        } else {
            swal({
                title: 'Failure !',
                text: `Something wrong ! Please try again !`,
                type: 'error'
            })
        }

        this.setState({
            ...this.state,
            publishing: false
        });
    }


    render() {
        const currentNum = this.state.calculator.current || this.state.calculator.total || '0';
        const { history, displayString, operator } = this.state.calculator;
        const { publishing } = this.state;
        
        return (
            <div className="app">
                <UpperDisplay calculation={displayString}
                />
                <Display currentText={currentNum}
                />
                <ButtonPanel
                    currentOperator={operator}
                    handleClick={this.handleClick.bind(this)}
                />
                <p> Your previous calculation are listed here : </p>
                <ul>
                    {history.map((h, i) => {
                        return <li key={i}> {h.Calculation} = {h.Result}</li>
                    })}
                </ul>
                <button disabled={publishing} type="button" onClick={this.handlePublishClick.bind(this)} >Publish result to Google Drive</button>
            </div>
        );
    }
}
