import React, { useState, useEffect, useCallback, useReducer } from "react";
import { getFilledArray } from "../Utils";
import NumbersComponent from "./NumbersComponent";
import StarsComponent from "./StarsComponent";
import _ from "lodash";

const getNextStarsCount = (numbers) => {
  //FIXME: This function is getting called multiple times.
  const nums = numbers.filter(number => number.status === "DEFAULT").map(n => n.number);

  if (nums.length === 1)
    return nums[0];

  const res = _.shuffle(nums)
    .slice(0, 2)
    .reduce((sum, current) => sum + current, 0);
  return res;
}

const starsReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return getNextStarsCount(action.numbers);
    case "CLICKED_ON_DEFAULT":
      return state === action.numbers
        .filter((n) => n.status === "MARKED" || n.status === "WRONG")
        .map((n) => n.number)
        .reduce((sum, current) => sum + current, 0) + action.number ? getNextStarsCount(_.reject(action.numbers, { number: action.number })) : state;
    case "CLICKED_ON_WRONG":
      return state === action.numbers
        .filter((n) => n.status === "MARKED" || n.status === "WRONG")
        .map((n) => n.number)
        .reduce((sum2, current) => sum2 + current, 0) - action.number ? getNextStarsCount(_.reject(action.numbers, { number: action.number })) : state;
    default:
      return state;
  }
}

const initializeNumbersReducer = (gameLimit) => {
  return getFilledArray(gameLimit).map((n) => ({
    number: n,
    status: "DEFAULT",
  }));
}

const numbersReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return initializeNumbersReducer(action.gameLimit);
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

const GameComponent = () => {
  //TODO: Move this Config to .json or so
  const gameLimit = 4;
  const starSize = 50;
  const starsHeight = 400;
  const starsWidth = 400;
  const [numbers, dispatchNumbers] = useReducer(numbersReducer, gameLimit, initializeNumbersReducer);
  const [currentStarsCount, dispatchStarsCount] = useReducer(starsReducer, numbers, getNextStarsCount);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNumberClick = useCallback((number) => {
    switch (number.status) {
      case "TAKEN":
        dispatchStarsCount({ type: "CLICKED_ON_TAKEN", number: number.value, numbers });
        dispatchNumbers({ type: "CLICKED_ON_TAKEN", number: number.value, currentStarsCount });
        return;
      case "MARKED":
        dispatchStarsCount({ type: "CLICKED_ON_MARKED", number: number.value, numbers });
        dispatchNumbers({ type: "CLICKED_ON_MARKED", number: number.value, currentStarsCount });
        return;
      case "WRONG":
        dispatchStarsCount({ type: "CLICKED_ON_WRONG", number: number.value, numbers });
        dispatchNumbers({ type: "CLICKED_ON_WRONG", number: number.value, currentStarsCount });
        return;
      case "DEFAULT":
        dispatchStarsCount({ type: "CLICKED_ON_DEFAULT", number: number.value, numbers });
        dispatchNumbers({ type: "CLICKED_ON_DEFAULT", number: number.value, currentStarsCount });
        return;
      default:
        throw new Error(
          `Number status ${number.status} is not considered as a valid status`
        );
    }
  }, [numbers, currentStarsCount]);

  const initGame = () => {
    setIsGameOver(false);
    dispatchNumbers({ type: "INIT", gameLimit });
    dispatchStarsCount({ type: "INIT", numbers });
  };
  if (isGameOver)
    return (
      <div style={{ textAlign: "center" }}>
        You Won
        <div>
          <button onClick={initGame}>Play again?</button>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        <div style={{ textAlign: "center" }} className="col-lg-6">
          <StarsComponent
            number={currentStarsCount}
            height={starsHeight}
            width={starsWidth}
            starSize={starSize}
          ></StarsComponent>
        </div>
        <div style={{ textAlign: "center" }} className="col-lg-6">
          <NumbersComponent
            numbers={numbers}
            onNumberClick={onNumberClick}
          ></NumbersComponent>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <span>Can't go further? </span>
        <button onClick={initGame}>Play again?</button>
      </div>
    </div>
  );
};

export default GameComponent;
