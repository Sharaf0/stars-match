import React from 'react';
interface Props {
  size: number;
  top: number;
  left: number;
}
const StarComponent: React.SFC<Props> = (props) => {
  return (
    <div style={{ position: "absolute", top: props.top, left: props.left, height: props.size, width: props.size }}>
      <img width={props.size} alt="star" src="star.png" ></img>
    </div>
  );
};
export default StarComponent;
