import React from 'react';
import NumberComponent from './NumberComponent';
const NumbersComponent = () => {
  //TODO: Get number of numbers from GameComponent
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return <div className="row">
    {numbers.map(n => <NumberComponent key={n} value={n}></NumberComponent>)}
  </div>
};

export default NumbersComponent;