import { CalculatorState } from "./../src/logic/CalculatorState";
import { ButtonLabels } from "../src/logic/ButtonLabels";
import * as Big from 'big.js';

describe("Calculator state", () => {
    let state: CalculatorState = null;

    beforeEach(() => {
        state = new CalculatorState();
    })

    test("should work", () => {
        expect(state).toBeTruthy();

        expect(state.current).toBeNull();
        expect(state.CurrentNumber).toBe(0);
        expect(state.operator).toBeNull();
        expect(state.total).toBeNull();
    });

    test("can do some calculation", () => {
        expect(state).toBeTruthy();

        expect(state.calc("10", "20", ButtonLabels.Add)).toEqual(Big(30));
        expect(state.calc("10", "20", ButtonLabels.Substract)).toEqual(Big(-10));
        expect(state.calc("10", "20", ButtonLabels.Multiple)).toEqual(Big(200));
        expect(state.calc("10", "20", ButtonLabels.Divide)).toEqual(Big(0.5));
    });

    test("can do some trivial number click", () => {
        state.addNumber("1");
        state.addNumber("2");

        expect(state.CurrentNumber).toEqual(Big(12));

        // state.onSpecialOperator(ButtonLabels.Negate);
        // expect(state.CurrentNumber).toBe(Big(-12));
    })

});

