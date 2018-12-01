import * as React from "react";
import "./../assets/scss/App.scss";
import { Display } from "./Display";
import { UpperDisplay } from "./UpperDisplay";
import { ButtonPanel } from "./ButtonPanel";
import { CalculatorState } from "../logic/CalculatorState";

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

    handleClick = (button: string) => {
        const newState = this.state.calculator.clickButton(button);
        this.setState({
            ...this.state,
            calculator: newState
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
                {history.length > 0 ? <p> Your previous calculation are listed here : </p> : null}
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
