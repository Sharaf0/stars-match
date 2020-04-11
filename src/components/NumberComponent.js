import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NumberComponent = (props) => {
  const [hovered, setHover] = useState(false);

  const toggleHover = (isHovered) => {
    setHover(isHovered);
  }

  const divStyle = {
    borderWidth: "1px",
    borderColor: "grey",
    borderStyle: "solid",
    margin: "1px"
  };

  if (hovered) {
    if (props.status === "TAKEN")
      divStyle.cursor = "no-drop";
    else
      divStyle.cursor = "pointer";
  }

  switch (props.status) {
    case "TAKEN":
      divStyle.backgroundColor = "lightgreen";
      break;
    case "MARKED":
      divStyle.backgroundColor = "lightblue";
      break;
    case "WRONG":
      divStyle.backgroundColor = "orangered";
      break;
    case "DEFAULT":
      divStyle.backgroundColor = "transparent";
      break;
    default:
      throw new Error(`Number status ${props.status} is not considered as a valid status`);
  }
  return (
    <div className="col-lg-3"
      style={divStyle}
      onClick={() => props.onNumberClick(props)}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <h3>{props.value}</h3>
    </div>
  );
};

NumberComponent.propTypes = {
  status: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onNumberClick: PropTypes.func.isRequired
};

export default NumberComponent;