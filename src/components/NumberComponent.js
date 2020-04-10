import React from 'react';

const NumberComponent = (props) => {
  const divStyle = {
    borderWidth: "1px",
    borderColor: "grey",
    borderStyle: "solid",
    margin: "1px"
  };
  return (
    <div className="col-lg-3" style={divStyle}>
      <h3>{props.value}</h3>
    </div>
  );
};

export default NumberComponent;