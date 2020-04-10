import React from 'react';

const StarComponent = (props) => {
  console.log(props);
  return (
    <div style={{position: "absolute", top: props.top, left: props.left, height: 50, width: 50 }}>
      <img width="50" alt={props.value} src="star.png" ></img>
    </div>
  );
};

export default StarComponent;