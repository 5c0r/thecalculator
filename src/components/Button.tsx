import * as React from "react";
import './../assets/scss/Button.scss';

export interface ButtonProps {
    label: string | number;
    operator?: boolean;
    handleClick: any;
}

export class Button extends React.Component<ButtonProps, undefined> {

    handleClick = () => {
        this.props.handleClick(this.props.label);
    }

    render() {
        const className = ["calculator-button",
            this.props.operator ? "operator" : "number"
        ]
        const { label } = this.props;

        return <button className={className.join(" ")}
            onClick={this.handleClick}>{label}
        </button>;
    }
}