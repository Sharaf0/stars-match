import React from 'react';
import StarComponent from './StarComponent';
import { getFilledArray, getRandomSquares } from '../Utils';

const StarsComponent = (props) => {
  const divStyle = {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    width: props.width,
    height: props.height
  };

  const squareSize = props.starSize;
  const numbers = getFilledArray(props.number);
  const squares = getRandomSquares(props.number, squareSize, props.height - divStyle.borderWidth, props.width - divStyle.borderWidth);

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