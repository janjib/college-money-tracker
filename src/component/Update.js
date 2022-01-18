import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Update = () => {
  let navigate = useNavigate();
  const [changeSaving, setChangeSaving] = useState("");

  const handleChange = (value, option) => {
    if (option === "saving") {
      setChangeSaving(() => value);
    }
    if (option === "spending") {
    }
  };
  return (
    <>
      {" "}
      <div className="d-flex justify-content-between align-items-center w-100 my-5">
        <h1 className="dashboard-title">Rujhan's Dashboard</h1>
        <button
          className="customize-button"
          onClick={() => navigate("/college-money-tracker")}
        >
          Dashboard
        </button>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">Saving</p>
          <button className="mx-3 reset-button">Reset</button>
          <button className="mx-3 change-button">Change</button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "saving")}
            value={changeSaving}
          />
        </div>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">Spending</p>
          <button className="mx-3 reset-button">Reset</button>
          <button className="mx-3 change-button">Change</button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "spending")}
            value={changeSaving}
          />
        </div>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">Income</p>
          <button className="mx-3 reset-button">Reset</button>
          <button className="mx-3 change-button">Change</button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "income")}
            value={changeSaving}
          />
        </div>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">Income Goal</p>
          <button className="mx-3 change-button">Change</button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "incomeGoal")}
            value={changeSaving}
          />
        </div>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">Spending Limit</p>
          <button className="mx-3 change-button">Change</button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "spendingLimit")}
            value={changeSaving}
          />
        </div>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">History</p>
          <button className="mx-3 reset-button">Reset</button>
        </div>
      </div>
    </>
  );
};

export default Update;
