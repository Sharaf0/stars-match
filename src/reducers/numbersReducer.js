import { getFilledArray } from "../Utils";
import _ from "lodash";

export const initializeNumbersReducer = (gameLimit) => {
  return getFilledArray(gameLimit).map((n) => ({
    number: n,
    status: "DEFAULT",
  }));
}

export const numbersReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.numbers;
    case "CLICKED_ON_DEFAULT":
      const sumOfMarkedAndWrong =
        state
          .filter((n) => n.status === "MARKED" || n.status === "WRONG")
          .map((n) => n.number)
          .reduce((sum, current) => sum + current, 0) + action.number;
      if (sumOfMarkedAndWrong === action.currentStarsCount) {
        return state.map(element =>
          element.status === "MARKED" || element.number === action.number ?
            { ...element, status: "TAKEN" } : element);
      }
      if (sumOfMarkedAndWrong > action.currentStarsCount) {
        return state.map(element => element.status === "MARKED" || element.number === action.number ?
          { ...element, status: "WRONG" } : element);
      }
      if (sumOfMarkedAndWrong < action.currentStarsCount) {
        if (_.some(state, (n) => n.status === "WRONG"))
          return state.map(element => element.number === action.number ? { ...element, status: "WRONG" } : element);
        else
          return state.map(element => element.number === action.number ? { ...element, status: "MARKED" } : element);
      }
      break;
    case "CLICKED_ON_MARKED":
      return state.map(element => element.number === action.number ? { ...element, status: "DEFAULT" } : element);
    case "CLICKED_ON_TAKEN":
      break;
    case "CLICKED_ON_WRONG":
      const sumOfWrong =
        state
          .filter((n) => n.status === "WRONG")
          .map((n) => n.number)
          .reduce((sum, current) => sum + current, 0) - action.number;
      if (sumOfWrong === action.currentStarsCount)
        return state.map(element =>
          (element.status === "WRONG" && element.number !== action.number) ?
            { ...element, status: "TAKEN" } :
            (element.number === action.number) ?
              { ...element, status: "DEFAULT" } :
              element
        );
      if (sumOfWrong > action.currentStarsCount)
        return state.map(element => element.number === action.number ? { ...element, status: "DEFAULT" } : element);
      if (sumOfWrong < action.currentStarsCount)
        return state.map(element =>
          (element.status === "WRONG" && element.number !== action.number) ?
            { ...element, status: "MARKED" } :
            (element.number === action.number) ?
              { ...element, status: "DEFAULT" } :
              element
        );
      break;
    default:
      break;
  }
  return state;
}