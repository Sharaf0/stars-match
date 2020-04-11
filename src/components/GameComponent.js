import React, { useState, useEffect } from "react";
import { getFilledArray, removeRandomElements } from '../Utils';
import NumbersComponent from "./NumbersComponent";
import StarsComponent from "./StarsComponent";
import _ from "lodash";

const GameComponent = () => {
  //TODO: Move this Config to .json or so
  const gameLimit = 12;
  const starSize = 50;
  const starsHeight = 400;
  const starsWidth = 400;
  const initialNotShownStarsCounts = getFilledArray(gameLimit + gameLimit / 2);
  const initialNumbers = getFilledArray(gameLimit).map(n => ({ number: n, status: "DEFAULT" }));

  //TODO: get the initial value differently.
  const [notShownStarsCounts, setNotShownStarsCounts] = useState([]);
  const [numbers, setNumbers] = useState();
  const [currentStarsCount, setCurrentStarsCount] = useState();

  //TODO: This function is a horror
  const setCurrentStarsCountWithNewValue = (copyOfNotShownStarsCounts, init) => {
    //TODO: Fix that
    if (currentStarsCount !== -1 && init === false) {
      copyOfNotShownStarsCounts = _.without(copyOfNotShownStarsCounts, currentStarsCount);
    }
    if (copyOfNotShownStarsCounts.length !== 0) {
      const number = copyOfNotShownStarsCounts[Math.floor(Math.random() * copyOfNotShownStarsCounts.length)];
      setCurrentStarsCount(number);
    }
    setNotShownStarsCounts(copyOfNotShownStarsCounts);
  }

  useEffect(() => {
    restartGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);//TODO: Fix dependencies

  //TODO: Is here the right place?
  const onNumberClick = (number) => {
    const copyOfNumbers = [...numbers];
    switch (number.status) {
      case "TAKEN":
        return;
      case "MARKED":
        //Unmark the number
        copyOfNumbers[_.findIndex(copyOfNumbers, n => n.number === number.value)].status = "DEFAULT";
        setNumbers(copyOfNumbers);
        return;
      case "WRONG":
        const sumOfWrong = copyOfNumbers
          .filter(n => n.status === "WRONG")
          .map(n => n.number)
          .reduce((sum, current) => sum + current, 0) - number.value;
        if (sumOfWrong === currentStarsCount) {
          //TODO: Do that in a better way.
          for (let index = 0; index < copyOfNumbers.length; index++) {
            const element = copyOfNumbers[index];
            if (element.status === "WRONG" && element.number !== number.value)
              element.status = "TAKEN";
            else if (element.number === number.value) {
              element.status = "DEFAULT";
            }
          }
          //TODO: Why Stars are rendered when I call that?
          setNumbers(copyOfNumbers);
          setCurrentStarsCountWithNewValue(notShownStarsCounts, false);
          return;
        }
        if (sumOfWrong > currentStarsCount) {
          copyOfNumbers[_.findIndex(copyOfNumbers, n => n.number === number.value)].status = "DEFAULT";
          setNumbers(copyOfNumbers);
        }
        if (sumOfWrong < currentStarsCount) {
          for (let index = 0; index < copyOfNumbers.length; index++) {
            const element = copyOfNumbers[index];
            if (element.status === "WRONG" && element.number !== number.value)
              element.status = "MARKED";
            else if (element.number === number.value) {
              element.status = "DEFAULT";
            }
          }
          setNumbers(copyOfNumbers);
          return;
        }
        break;
      case "DEFAULT":
        const sumOfMarkedAndWrong = copyOfNumbers
          .filter(n => n.status === "MARKED" || n.status === "WRONG")
          .map(n => n.number)
          .reduce((sum, current) => sum + current, 0) + number.value;
        if (sumOfMarkedAndWrong === currentStarsCount) {
          //TODO: Do that in a better way.
          for (let index = 0; index < copyOfNumbers.length; index++) {
            const element = copyOfNumbers[index];
            if (element.status === "MARKED" || element.number === number.value)
              element.status = "TAKEN";
          }
          //TODO: Why Stars are rendered when I call that?
          setNumbers(copyOfNumbers);
          setCurrentStarsCountWithNewValue(notShownStarsCounts, false);
          return;
        }
        if (sumOfMarkedAndWrong > currentStarsCount) {
          for (let index = 0; index < copyOfNumbers.length; index++) {
            const element = copyOfNumbers[index];
            if (element.status === "MARKED" || element.number === number.value)
              element.status = "WRONG";
          }
          //TODO: Why Stars are rendered when I call that?
          setNumbers(copyOfNumbers);
          return;
        }
        if (sumOfMarkedAndWrong < currentStarsCount) {
          if (_.some(copyOfNumbers, n => n.status === "WRONG")) {
            //Mark number in numbers
            copyOfNumbers[copyOfNumbers.findIndex(n => n.number === number.value)].status = "WRONG";
          }
          else {
            copyOfNumbers[copyOfNumbers.findIndex(n => n.number === number.value)].status = "MARKED";
          }
          //TODO: Why Stars are rendered when I call that?
          setNumbers(copyOfNumbers);
          return;
        }
        break;
      default:
        throw new Error(`Number status ${number.status} is not considered as a valid status`);
    }
  }

  const restartGame = () => {
    let copyOfInitialNotShownStarsCounts = [...initialNotShownStarsCounts];
    copyOfInitialNotShownStarsCounts = removeRandomElements(copyOfInitialNotShownStarsCounts, copyOfInitialNotShownStarsCounts.length - 5);
    setNotShownStarsCounts(copyOfInitialNotShownStarsCounts);
    setNumbers(initialNumbers);
    setCurrentStarsCount(-1);
    setCurrentStarsCountWithNewValue(copyOfInitialNotShownStarsCounts, true);
  }

  if (notShownStarsCounts.length === 0)
    return <div style={{ textAlign: "center" }}>
      You Won
      <div>
        <button onClick={restartGame}>Play again?</button>
      </div>
    </div>;

  return <div className="container">
    <div className="row">
      <div style={{ textAlign: "center" }} className="col-lg-6">
        <StarsComponent number={currentStarsCount} height={starsHeight} width={starsWidth} starSize={starSize}></StarsComponent>
      </div>
      <div style={{ textAlign: "center" }} className="col-lg-6">
        <NumbersComponent numbers={numbers} onNumberClick={(number) => onNumberClick(number)}></NumbersComponent>
      </div>
    </div>
    <div style={{ textAlign: "center" }}>
      <span>Can't go further?</span>
      <button onClick={restartGame}>Play again?</button>
    </div>
  </div>
}

export default GameComponent;