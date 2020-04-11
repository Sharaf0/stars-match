import React from 'react';
import PropTypes from 'prop-types';

const StarComponent = (props) => {
  return (
    <div style={{position: "absolute", top: props.top, left: props.left, height: props.size, width: props.size }}>
      <img width={props.size} alt={props.value} src="star.png" ></img>
    </div>
  );
};
StarComponent.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
};
export default StarComponent;