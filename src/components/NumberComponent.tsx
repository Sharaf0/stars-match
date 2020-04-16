import React, { useState } from 'react';

export interface OnNumberClick {
  (value: NumberElement): void
}

export class NumberElement {
  status: string;
  value: number;
  onNumberClick: OnNumberClick;

  constructor(v: number, onNumberClick: OnNumberClick) {
    this.status = 'DEFAULT';
    this.value = v;
    this.onNumberClick = onNumberClick;
  }
}

const NumberComponent: React.SFC<NumberElement> = (props) => {
  const [hovered, setHover] = useState(false);

  const toggleHover = (isHovered: boolean) => {
    setHover(isHovered);
  }

  const divStyle = {
    borderWidth: "1px",
    borderColor: "grey",
    borderStyle: "solid",
    margin: "1px",
    cursor: "default",
    backgroundColor: "transparent"
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
}
export default NumberComponent;