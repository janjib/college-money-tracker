import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import { db } from "../config";

const Update = () => {
  let navigate = useNavigate();
  const [basicInfo, setBasicInfo, history, setHistory, loading, setLoading] =
    useContext(AppContext);
  const [savingInput, setSavingInput] = useState();
  const [spendingInput, setSpendingInput] = useState();
  const [incomeInput, setIncomeInput] = useState();
  const [incomeGoalInput, setIncomeGoalInput] = useState();
  const [spendingLimitInput, setSpendingLimitInput] = useState();

  const handleChange = (value, option) => {
    if (option === "saving") {
      setSavingInput(() => value);
    }
    if (option === "spending") {
      setSpendingInput(() => value);
    }
    if (option === "income") {
      setIncomeInput(() => value);
    }
    if (option === "incomeGoal") {
      setIncomeGoalInput(() => value);
    }
    if (option === "spendingLimit") {
      setSpendingLimitInput(() => value);
    }
  };

  const updateChange = async (value, option) => {
    setLoading(false);
    if (option === "saving") {
      let newValue = { Saving: value };
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      await updateDoc(userDoc, newValue);
      setBasicInfo({ ...basicInfo, saving: value });
    }
    if (option === "spending") {
      let newValue = { Spending: value };
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      await updateDoc(userDoc, newValue);
      setBasicInfo({ ...basicInfo, spending: value });
    }
    if (option === "income") {
      let newValue = { totalIncome: value };
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      await updateDoc(userDoc, newValue);
      setBasicInfo({ ...basicInfo, income: value });
    }
    if (option === "incomeGoal") {
      let newValue = { incomeGoal: value };
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      await updateDoc(userDoc, newValue);
      setBasicInfo({ ...basicInfo, incomeGoal: value });
    }
    if (option === "spendingLimit") {
      let newValue = { spendingLimit: value };
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      await updateDoc(userDoc, newValue);
      setBasicInfo({ ...basicInfo, spendingLimit: value });
    }
    setLoading(true);
  };
  // const resetHistory = async () => {
  //   const subColRef = collection(
  //     db,
  //     "Rujhan",
  //     "RujhanHistory",
  //     "TransactionHistory"
  //   );
  //   const qSnap = await getDocs(subColRef);
  //   console.log(qSnap);
  //   const historyArr = qSnap.docs.forEach((d) => await deleteDoc(d.id));
  //   // console.log(historyArr);
  // };
  const reset = async (item) => {
    setLoading(true);
    if (item == "saving") {
      // setLoading(true);
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      const resetSavingField = { Saving: 0 };
      await updateDoc(userDoc, resetSavingField);
      // setBasicInfo({ ...basicInfo, saving: 0 });
      // setLoading(false);
    }
    if (item == "spending") {
      // setLoading(true);
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      const resetSpendingField = { Spending: 0 };
      await updateDoc(userDoc, resetSpendingField);
      // setLoading(false);
    }
    if (item == "income") {
      // setLoading(true);
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      const resetIncomeField = { totalIncome: 0 };
      await updateDoc(userDoc, resetIncomeField);
      // setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("data: ", basicInfo);
  });
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
          <button className="mx-3 reset-button" onClick={() => reset("saving")}>
            Reset
          </button>
          <button
            className="mx-3 change-button"
            onClick={(e) => updateChange(Number(savingInput), "saving")}
          >
            Change
          </button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "saving")}
            value={savingInput}
          />
        </div>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">Spending</p>
          <button
            className="mx-3 reset-button"
            onClick={() => reset("spending")}
          >
            Reset
          </button>
          <button
            className="mx-3 change-button"
            onClick={() => updateChange(Number(spendingInput), "spending")}
          >
            Change
          </button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "spending")}
            value={spendingInput}
          />
        </div>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">Income</p>
          <button className="mx-3 reset-button" onClick={() => reset("income")}>
            Reset
          </button>
          <button
            className="mx-3 change-button"
            onClick={() => updateChange(Number(incomeInput), "income")}
          >
            Change
          </button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "income")}
            value={incomeInput}
          />
        </div>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">Income Goal</p>
          <button
            className="mx-3 change-button"
            onClick={() => updateChange(Number(incomeGoalInput), "incomeGoal")}
          >
            Change
          </button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "incomeGoal")}
            value={incomeGoalInput}
          />
        </div>
      </div>
      <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">Spending Limit</p>
          <button
            className="mx-3 change-button"
            onClick={() =>
              updateChange(Number(spendingLimitInput), "spendingLimit")
            }
          >
            Change
          </button>
        </div>
        <div className="my-3 w-100">
          <input
            type="number"
            className="input-box w-100"
            onChange={(e) => handleChange(e.target.value, "spendingLimit")}
            value={spendingLimitInput}
          />
        </div>
      </div>
      {/* <div className="question-form my-3">
        <div className="d-flex w-100 align-items-center ">
          <p className="mx-3 input-title">History</p>
          <button className="mx-3 reset-button" onClick={resetHistory}>
            Reset
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Update;
