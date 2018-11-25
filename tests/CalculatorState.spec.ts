import { CalculatorState } from "./../src/logic/CalculatorState";
import { ButtonLabels } from "../src/logic/ButtonLabels";
import * as Big from 'big.js';

describe("Calculator state", () => {
    let state: CalculatorState = null;

    beforeEach(() => {
        state = new CalculatorState();
    })

    it("should work", () => {
        expect(state).toBeTruthy();

        expect(state.current).toBeNull();
        expect(state.CurrentNumber).toBe(0);
        expect(state.operator).toBeNull();
        expect(state.total).toBeNull();
    });

    it("can do some calculation", () =>{
        expect(state).toBeTruthy();

        expect(state.calc("10","20",ButtonLabels.Add)).toEqual(Big(30));
        expect(state.calc("10","20",ButtonLabels.Substract)).toEqual(Big(-10));
        expect(state.calc("10","20",ButtonLabels.Multiple)).toEqual(Big(200));
        expect(state.calc("10","20",ButtonLabels.Divide)).toEqual(Big(0.5));
    });

});

