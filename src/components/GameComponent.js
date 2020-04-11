import React, { useState, useEffect } from "react";
import { getFilledArray } from '../Utils';
import NumbersComponent from "./NumbersComponent";
import StarsComponent from "./StarsComponent";
import _ from "lodash";

const GameComponent = () => {
  const gameLimit = 9;

  //TODO: get the initial value differently.
  const [notShownStarsCounts, setNotShownStarsCounts] = useState(getFilledArray(gameLimit));
  const [numbers, setNumbers] = useState(getFilledArray(gameLimit).map(n => ({ number: n, status: "DEFAULT" })));
  const [currentStarsCount, _setCurrentStarsCount] = useState();

  const setCurrentStarsCount = (number) => {
    setNotShownStarsCounts(_.without(notShownStarsCounts, number));
    _setCurrentStarsCount(number);
  }
  const getNextNumber = () => notShownStarsCounts[Math.floor(Math.random() * notShownStarsCounts.length)];

  useEffect(() => {
    setCurrentStarsCount(getNextNumber());
  },[]);//TODO: Fix here

  const onNumberClick = (number) => {
    switch (number.status) {
      case "TAKEN":
        return;
      case "MARKED":
        //Unmark the number
        numbers[_.findIndex(numbers, n => n.value === number.value)].status = "DEFAULT";
        setNumbers(numbers);
        return;
      case "WRONG":

        return;
      case "DEFAULT":
        const copyOfNumbers = [...numbers];
        const sumOfMarked = copyOfNumbers
        .filter(n => n.status === "MARKED")
        .map(n => n.number)
        .reduce((sum, current) => sum + current, 0) + number.value;
        if(sumOfMarked === currentStarsCount) {
          //TODO: Do that in a better way.
          for (let index = 0; index < copyOfNumbers.length; index++) {
            const element = copyOfNumbers[index];
            if(element.status === "MARKED" || element.number === number.value)
              element.status = "TAKEN";
          }
          //TODO: Why Stars are rendered when I call that?
          setNumbers(copyOfNumbers);
          return;
        }
        //Mark number in numbers
        copyOfNumbers[copyOfNumbers.findIndex(n => n.number === number.value)].status = "MARKED";
        //TODO: Why Stars are rendered when I call that?
        setNumbers(copyOfNumbers);
        return;
      default:
        throw new Error(`Number status ${number.status} is not considered as a valid status`);
    }
  }
  if (notShownStarsCounts.length === 0)
    return <div>You Won</div>;

  return <div className="container">
    <div className="row">
      <div style={{ textAlign: "center" }} className="col-lg-6">
        <StarsComponent number={currentStarsCount} height={400} width={400} starSize={50}></StarsComponent>
      </div>
      <div style={{ textAlign: "center" }} className="col-lg-6">
        <NumbersComponent numbers={numbers} onNumberClick={(number) => onNumberClick(number)}></NumbersComponent>
      </div>
    </div>
  </div>
}

export default GameComponent;