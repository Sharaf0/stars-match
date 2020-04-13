import React, { useMemo } from 'react';
import StarComponent from './StarComponent';
import { getFilledArray, getRandomSquares } from '../Utils';
import PropTypes from 'prop-types';

const StarsComponent = (props) => {
  const divStyle = {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    width: props.width,
    height: props.height
  };

  const squareSize = props.starSize;

  const numbersAndSquares = useMemo(() => {
    const numbers = getFilledArray(props.number);
    const squares = getRandomSquares(props.number, squareSize, props.height - divStyle.borderWidth, props.width - divStyle.borderWidth);
    return squares.map((square, index) => ({
      number: numbers[index],
      left: square.left,
      top: square.top
    }));
  }, [divStyle.borderWidth, props.height, props.width, props.number, squareSize]);

  return (
    <>
      <div className="row" style={divStyle} >
        {numbersAndSquares.map(n =>
          <StarComponent key={n.number} value={n.number} size={squareSize} top={n.top} left={n.left}>
          </StarComponent>)}
      </div>
    </>)
};

StarsComponent.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  starSize: PropTypes.number.isRequired
};

export default StarsComponent;