import React, { useEffect, useCallback, useReducer, useMemo } from "react";
import NumbersComponent from "./NumbersComponent";
import StarsComponent from "./StarsComponent";
import { starsReducer } from '../reducers/starsReducer';
import { initializeNumbersReducer, numbersReducer } from "../reducers/numbersReducer";


const GameComponent = ({ config }) => {
  //TODO: Move this Config to .json or so
  const [numbers, dispatchNumbers] = useReducer(numbersReducer, null);
  const [currentStarsCount, dispatchStarsCount] = useReducer(starsReducer, null);
  const isGameOver = useMemo(() => {
    return currentStarsCount === 0;
  }, [currentStarsCount]);

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
    const numbers = initializeNumbersReducer(config.gameLimit);
    dispatchNumbers({ type: "INIT", numbers });
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

  if (numbers === null) {
    return 'loading...';
  }

  return (
    <div className="container">
      <div className="row">
        <div style={{ textAlign: "center" }} className="col-lg-6">
          <StarsComponent
            number={currentStarsCount}
            height={config.starsHeight}
            width={config.starsWidth}
            starSize={config.starSize}
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
