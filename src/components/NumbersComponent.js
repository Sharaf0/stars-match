import React from 'react';
import NumberComponent from './NumberComponent';
const NumbersComponent = (props) => {
  return <div className="row">
    {props.numbers.map(n => <NumberComponent key={n.number} value={n.number} status={n.status}></NumberComponent>)}
  </div>
};

export default NumbersComponent;