import React, { useState } from "react";
import { getFilledArray } from '../Utils';
import NumbersComponent from "./NumbersComponent";
import StarsComponent from "./StarsComponent";
const GameComponent = () => {
  const gameLimit = 9;
  const [notShownStarsCounts, setNotShownStarsCounts] = useState(getFilledArray(gameLimit));
  //TODO: .map(n => {number: n, status: "DEFAULT"})
  const [numbers, setNumbers] = useState(getFilledArray(gameLimit).map(n => {return {number: n, status: "DEFAULT"}}));

  if (notShownStarsCounts.length === 0)
    return <div>You Won</div>;

  const getNextNumber = () => Math.ceil(Math.random() * notShownStarsCounts.length);

  return <div className="container">
    <div className="row">
      <div style={{ textAlign: "center" }} className="col-lg-6">
        <StarsComponent number={getNextNumber()} height={400} width={400} starSize={50}></StarsComponent>
      </div>
      <div style={{ textAlign: "center" }} className="col-lg-6">
        <NumbersComponent numbers={numbers}></NumbersComponent>
      </div>
    </div>
  </div>
}

export default GameComponent;