import _ from "lodash";
import { NumberElement } from "../components/NumberComponent";

export class NumberReducerAction {
  actionType: string;
  numbers: NumberElement[];
  currentNumber: number;
  currentStarsCount: number;
  constructor(actionType: string, numbers: NumberElement[], currentNumber: number, currentStarsCount: number) {
    this.actionType = actionType;
    this.numbers = numbers;
    this.currentNumber = currentNumber;
    this.currentStarsCount = currentStarsCount;
  }
}

export const numbersReducer = (state: NumberElement[], action: NumberReducerAction) => {
  switch (action.actionType) {
    case "INIT":
      return action.numbers;
    case "CLICKED_ON_DEFAULT":
      const sumOfMarkedAndWrong =
        state
          .filter((n) => n.status === "MARKED" || n.status === "WRONG")
          .map((n) => n.value)
          .reduce((sum, current) => sum + current, 0) + action.currentNumber;
      if (sumOfMarkedAndWrong === action.currentStarsCount) {
        return state.map(element =>
          element.status === "MARKED" || element.value === action.currentNumber ?
            { ...element, status: "TAKEN" } : element);
      }
      if (sumOfMarkedAndWrong > action.currentStarsCount) {
        return state.map(element => element.status === "MARKED" || element.value === action.currentNumber ?
          { ...element, status: "WRONG" } : element);
      }
      if (sumOfMarkedAndWrong < action.currentStarsCount) {
        if (_.some(state, (n) => n.status === "WRONG"))
          return state.map(element => element.value === action.currentNumber ? { ...element, status: "WRONG" } : element);
        else
          return state.map(element => element.value === action.currentNumber ? { ...element, status: "MARKED" } : element);
      }
      break;
    case "CLICKED_ON_MARKED":
      return state.map(element => element.value === action.currentNumber ? { ...element, status: "DEFAULT" } : element);
    case "CLICKED_ON_TAKEN":
      break;
    case "CLICKED_ON_WRONG":
      const sumOfWrong =
        state
          .filter((n) => n.status === "WRONG")
          .map((n) => n.value)
          .reduce((sum, current) => sum + current, 0) - action.currentNumber;
      if (sumOfWrong === action.currentStarsCount)
        return state.map(element =>
          (element.status === "WRONG" && element.value !== action.currentNumber) ?
            { ...element, status: "TAKEN" } :
            (element.value === action.currentNumber) ?
              { ...element, status: "DEFAULT" } :
              element
        );
      if (sumOfWrong > action.currentStarsCount)
        return state.map(element => element.value === action.currentNumber ? { ...element, status: "DEFAULT" } : element);
      if (sumOfWrong < action.currentStarsCount)
        return state.map(element =>
          (element.status === "WRONG" && element.value !== action.currentNumber) ?
            { ...element, status: "MARKED" } :
            (element.value === action.currentNumber) ?
              { ...element, status: "DEFAULT" } :
              element
        );
      break;
    default:
      break;
  }
  return state;
}