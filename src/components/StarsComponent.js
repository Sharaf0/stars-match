import React from 'react';
import StarComponent from './StarComponent';
import { getFilledArray, getRandomSquares } from '../Utils';

const StarsComponent = (props) => {
  const squareSize = 50;
  const numbers = getFilledArray(props.number);
  const squares = getRandomSquares(props.number, squareSize, props.height, props.width);

  let numbersAndSquares = [];
  //TODO: Do that in a better way
  for (let index = 0; index < numbers.length; index++) {
    numbersAndSquares.push(
      {
        number: numbers[index],
        left: squares[index].left,
        top: squares[index].top
      });
  }

  const divStyle = {
    border: "1px solid black",
    width: props.width,
    height: props.height
  };

  return (
    <>
      <div className="row" style={divStyle} >
        {numbersAndSquares.map(n =>
          <StarComponent key={n.number} value={n.number} size={squareSize} top={n.top} left={n.left}>
          </StarComponent>)}
      </div>
    </>)
};

export default StarsComponent;