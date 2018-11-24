import * as React from "react";

export interface ButtonProps { }

export class Button extends React.Component<ButtonProps, undefined> {
    render() {
        return <button>What button</button>;
    }
}