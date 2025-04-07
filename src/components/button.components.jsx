import React, { useState } from "react";
import "./index.scss";

const ZombieButton = ({ text, click }) => {
  const [state, setState] = useState("alive");

  const handleBtnClick = () => {
    if (state === "alive") {
      setState("dead");
      click();
      setTimeout(() => {
        setState("alive");
      }, 1800);
    }
  };

  return (
    <div className="vcv-container">
      <div className="vcv-button-container" data-state={state}>
        <button
          className="df aic gap-20 vcv-btn"
          data-hover={`${text} ಠ＿ಠ`}
          onClick={handleBtnClick}
        >
          <span>{text}</span> ｡◕ ‿ ◕｡
        </button>
        <span className="vcv-ghost-btn">ಥ﹏ಥ</span>
      </div>
    </div>
  );
};

export default ZombieButton;
