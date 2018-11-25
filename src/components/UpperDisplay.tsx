import * as React from "react";
import './../assets/scss/UpperDisplay.scss';

export interface UpperDisplayProps {
    calculation?: string;
}

export class UpperDisplay extends React.Component<UpperDisplayProps, undefined> {

    constructor(props) {
        super(props);
    }

    render() {
        const { calculation } = this.props;
        return <div className="calculator-upper"> {calculation} </div>;
    }
}