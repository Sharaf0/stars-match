import React from 'react';
import NumberComponent from './NumberComponent';
import PropTypes from 'prop-types';

const NumbersComponent = (props) => {
  return <div className="row">
    {props.numbers.map(n => <NumberComponent key={n.number} value={n.number} status={n.status} onNumberClick={props.onNumberClick}></NumberComponent>)}
  </div>
};

NumbersComponent.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
  })).isRequired,
  onNumberClick: PropTypes.func.isRequired
};

export default NumbersComponent;