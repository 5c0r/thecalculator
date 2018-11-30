import { CalculatorState } from "./../src/logic/CalculatorState";
import { ButtonLabels } from "../src/logic/ButtonLabels";
const Big = require('big.js');

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

        expect(state.calc("10", "20", ButtonLabels.Add).toString()).toBe(Big(30).toString());
        expect(state.calc("10", "20", ButtonLabels.Substract).toString()).toBe(Big(-10).toString());
        expect(state.calc("10", "20", ButtonLabels.Multiple).toString()).toBe(Big(200).toString());
        expect(state.calc("10", "20", ButtonLabels.Divide).toString()).toBe(Big(0.5).toString());
    });

    test("can do some trivial number click", () => {
        state.onNumberClick("1");
        state.onNumberClick("2");

        expect(state.CurrentNumber.toString()).toEqual(Big(12).toString());
    });


    test("can do decimal number click", () => {
        state.onNumberClick("1");
        state.onSpecialOperator(ButtonLabels.Decimal);
        state.onNumberClick("2");

        expect(state.CurrentNumber.valueOf()).toBe(Big(1.2).valueOf());

        state.resetAll();

        state.onSpecialOperator(ButtonLabels.Decimal);
        state.onNumberClick("2");

        expect(state.CurrentNumber.valueOf()).toBe(Big(0.2).valueOf());

        // state.onSpecialOperator(ButtonLabels.Negate);
        // expect(state.CurrentNumber).toBe(Big(-12));
    })

});

