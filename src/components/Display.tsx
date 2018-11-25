import * as React from "react";
import './../assets/scss/Display.scss';

export interface DisplayProps {
    currentText?: string;
}

export class Display extends React.Component<DisplayProps, undefined> {
    render() {
        const { currentText } = this.props;
        return <div className="calculator-display">{currentText}</div>;
    }
}