import React, { useCallback, useReducer, useEffect } from "react";
import Config from "../config";
import StarsComponent from "./StarsComponent";
import NumbersComponent from "./NumbersComponent";
import { NumberElement, OnNumberClick } from "./NumberComponent";
import { numbersReducer, NumberReducerAction } from "../reducers/numberReducer";
import { starsReducer, StarReducerAction } from "../reducers/starReducer";
import _ from 'lodash';

interface Props {
  config: Config
}

const GameComponent: React.SFC<Props> = ({ config }) => {
  const [currentStarsCount, dispatchStarsCount] = useReducer(starsReducer, Number.NEGATIVE_INFINITY);
  const [numbers, dispatchNumbers] = useReducer(numbersReducer, new Array<NumberElement>());
  
  const onNumberClick: OnNumberClick = useCallback((number: NumberElement) => {
    switch (number.status) {
      case "TAKEN":
        dispatchStarsCount(new StarReducerAction("CLICKED_ON_TAKEN", numbers, number.value));
        dispatchNumbers(new NumberReducerAction("CLICKED_ON_TAKEN", [], number.value, currentStarsCount));
        return;
      case "MARKED":
        dispatchStarsCount(new StarReducerAction("CLICKED_ON_MARKED", numbers, number.value));
        dispatchNumbers(new NumberReducerAction("CLICKED_ON_MARKED", [], number.value, currentStarsCount));
        return;
      case "WRONG":
        dispatchStarsCount(new StarReducerAction("CLICKED_ON_WRONG", numbers, number.value));
        dispatchNumbers(new NumberReducerAction("CLICKED_ON_WRONG", [], number.value, currentStarsCount));
        return;
      case "DEFAULT":
        dispatchStarsCount(new StarReducerAction("CLICKED_ON_DEFAULT", numbers, number.value));
        dispatchNumbers(new NumberReducerAction("CLICKED_ON_DEFAULT", [], number.value, currentStarsCount));
        return;
      default:
        throw new Error(
          `Number status ${number.status} is not considered as a valid status`
        );
    }
  }, [currentStarsCount, numbers]);

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initGame = () => {
    const numbers = _.range(1, config.gameLimit + 1).map(n => new NumberElement(n, onNumberClick));
    dispatchNumbers(new NumberReducerAction("INIT", numbers, Number.NaN, Number.NaN));
    dispatchStarsCount(new StarReducerAction("INIT", numbers, Number.NaN));
  };
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
}

export default GameComponent;
