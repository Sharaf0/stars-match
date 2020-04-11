import React from 'react';

const NumberComponent = (props) => {
  const divStyle = {
    borderWidth: "1px",
    borderColor: "grey",
    borderStyle: "solid",
    margin: "1px"
  };
  switch (props.status) {
    case "TAKEN":
      divStyle.backgroundColor = "lightgrey";
      break;
    case "MARKED":
      divStyle.backgroundColor = "lightblue";
      break;
    case "WRONG":
      divStyle.backgroundColor = "lightred";
      break;
    case "DEFAULT":
      divStyle.backgroundColor = "transparent";
      break;
    default:
      throw new Error(`Number status ${props.status} is not considered as a valid status`);
  }
  return (
    <div className="col-lg-3" style={divStyle}>
      <h3>{props.value}</h3>
    </div>
  );
};

export default NumberComponent;