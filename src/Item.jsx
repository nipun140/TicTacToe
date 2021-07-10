import React from "react";
import Cross from "./cross";
import Circle from "./Circle";
import "./App.css";

function Item(props) {
  const { winelineArr, index, isclickable, state, onClick } = props;

  //check state type to render custom components
  function checkType() {
    if (state === "") {
      return "";
    } else if (state === "X") {
      return <Cross />;
    } else {
      return <Circle />;
    }
  }

  return (
    <>
      <div
        onClick={onClick}
        style={{
          pointerEvents: isclickable ? "all" : "none",
          background: winelineArr.includes(index) ? "red" : "blue",
        }}
        className="item"
      >
        {checkType()}
      </div>
    </>
  );
}

export default Item;
