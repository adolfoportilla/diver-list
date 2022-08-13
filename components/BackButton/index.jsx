import React from "react";

const BackButton = ({ onClick }) => {
  return (
    <div onClick={onClick()}>
      <button>Back</button>
    </div>
  );
};

export default BackButton;
