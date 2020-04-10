import React from 'react';
import NumbersComponent from "./NumbersComponent";
import StarsComponent from "./StarsComponent";
const BoardComponent = () => {
  return (
    <div className="row">
      <div style={{ textAlign: "center" }} className="col-lg-6">
        <StarsComponent number={9} height={400} width={400}></StarsComponent>
      </div>
      <div style={{ textAlign: "center" }} className="col-lg-6">
        <NumbersComponent></NumbersComponent>
      </div>
    </div>
  );
};

export default BoardComponent;