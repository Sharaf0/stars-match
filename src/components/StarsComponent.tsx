import React, { useMemo } from 'react';
import StarComponent from './StarComponent';
import { getRandomSquares } from '../Utils';


interface Props {
  width: number,
  height: number,
  number: number,
  starSize: number
};

const StarsComponent: React.SFC<Props> = (props) => {
  const divStyle = {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    width: props.width,
    height: props.height
  };

  const squareSize = props.starSize;

  const starsSquares = useMemo(() => {
    const squares = getRandomSquares(props.number, squareSize, props.height - divStyle.borderWidth, props.width - divStyle.borderWidth);
    return squares;
  }, [divStyle.borderWidth, props.height, props.width, props.number, squareSize]);

  return (
    <>
      <div className="row" style={divStyle} >
        {starsSquares.map(n =>
          <StarComponent key={n.left.toString() + n.top.toString()} size={squareSize} top={n.top} left={n.left}>
          </StarComponent>)}
      </div>
    </>)
};

export default StarsComponent;