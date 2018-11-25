import * as React from 'react';
import './../assets/scss/ButtonPanel.scss';
import { Button } from './Button';
import { ButtonLabels } from '../logic/ButtonLabels';

export interface ButtonPanelProps {
    handleClick: any;
    currentOperator: any;
}

export class ButtonPanel extends React.Component<ButtonPanelProps, any> {
    constructor(props) {
        super(props);
    }

    handleClick = (value: any) => {
        this.props.handleClick(value);
    }

    render() {

        return (
            <div>
                <div className="button-panel">
                    <Button handleClick={this.handleClick} label={ButtonLabels.CE}></Button>
                    <Button handleClick={this.handleClick} label={ButtonLabels.C}></Button>
                    <Button handleClick={this.handleClick} label={ButtonLabels.Delete}></Button>
                    <Button handleClick={this.handleClick} operator label={ButtonLabels.Divide}></Button>
                </div>
                <div className="button-panel">
                    <Button handleClick={this.handleClick} label={7}></Button>
                    <Button handleClick={this.handleClick} label={8}></Button>
                    <Button handleClick={this.handleClick} label={9}></Button>
                    <Button handleClick={this.handleClick} operator label={ButtonLabels.Multiple}></Button>
                </div>
                <div className="button-panel">
                    <Button handleClick={this.handleClick} label={4}></Button>
                    <Button handleClick={this.handleClick} label={5}></Button>
                    <Button handleClick={this.handleClick} label={6}></Button>
                    <Button
                        handleClick={this.handleClick} operator label={ButtonLabels.Substract}></Button>
                </div>
                <div className="button-panel">
                    <Button handleClick={this.handleClick} label={1}></Button>
                    <Button handleClick={this.handleClick} label={2}></Button>
                    <Button handleClick={this.handleClick} label={3}></Button>
                    <Button handleClick={this.handleClick} operator label={ButtonLabels.Add}></Button>
                </div>
                <div className="button-panel">
                    <Button handleClick={this.handleClick} label={ButtonLabels.Negate}></Button>
                    <Button handleClick={this.handleClick} label={0}></Button>
                    <Button handleClick={this.handleClick} label={ButtonLabels.Decimal}></Button>
                    <Button handleClick={this.handleClick} label={ButtonLabels.Result}></Button>
                </div>
            </div>
        )
    }
}