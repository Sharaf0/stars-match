import React from 'react';
import NumberComponent, { NumberElement, OnNumberClick } from './NumberComponent';

interface Props {
  numbers: NumberElement[];
  onNumberClick: OnNumberClick;
}

const NumbersComponent: React.SFC<Props> = (props) => {
  return <div className="row">
    {props.numbers.map(n => <NumberComponent key={n.value} value={n.value} status={n.status} onNumberClick={props.onNumberClick}></NumberComponent>)}
  </div>
}
export default NumbersComponent;