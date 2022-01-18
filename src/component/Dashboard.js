import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();
  const [mode, setMode] = useState("input");
  const [history, setHistory] = useState([]);
  // const [saving, setSaving] = useState(0);
  // const [spending, setSpending] = useState(0);
  const [info, setInfo] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [income, setIncome] = useState(0);
  const [basicInfo, setBasicInfo] = useState({
    saving: 0,
    spending: 0,
    income: 0,
    incomeGoal: 0,
    spendingLimit: 0,
  });
  const [isInput, setIsInput] = useState(true);
  const inputButtonRef = useRef();
  const outputButtonRef = useRef();

  const calculateSavingSpending = async () => {
    setLoading(true);
    if (mode == "input") {
      // setSaving((saving) => saving + Number(amount));
      // setIncome((income) => income + Number(amount));
      setBasicInfo({
        ...basicInfo,
        saving: basicInfo.saving + Number(amount),
        income: basicInfo.income + Number(amount),
      });
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      const newSavingFields = {
        Saving: basicInfo.saving + Number(amount),
        totalIncome: basicInfo.income + Number(amount),
      };
      await updateDoc(userDoc, newSavingFields);
      setLoading(false);
    } else {
      // setSaving((saving) => saving - Number(amount));
      // setSpending((spending) => Number(spending) + Number(amount));
      setBasicInfo({
        ...basicInfo,
        saving: basicInfo.saving - Number(amount),
        spending: Number(basicInfo.spending) + Number(amount),
      });
      const userDoc = doc(db, "Rujhan", "RujhanMoney");
      const newSavingSpendingFields = {
        Saving: basicInfo.saving - Number(amount),
        Spending: Number(basicInfo.spending) + Number(amount),
      };
      await updateDoc(userDoc, newSavingSpendingFields);
      setLoading(false);
    }

    //setDebit((debit) => debit - total);
  };

  const getHistory = async () => {
    const subColRef = collection(
      db,
      "Rujhan",
      "RujhanHistory",
      "TransactionHistory"
    );
    const qSnap = await getDocs(subColRef, orderBy("timestamp", "desc"));
    console.log(qSnap);
    const historyArr = qSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setHistory(historyArr);
  };

  const getGeneralInfo = async () => {
    setLoading(true);
    const docRef = doc(db, "Rujhan", "RujhanMoney");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // setSaving(docSnap.data().Saving);
      // setSpending(docSnap.data().Spending);
      // setIncome(docSnap.data().totalIncome);
      setBasicInfo({
        ...basicInfo,
        saving: docSnap.data().Saving,
        spending: docSnap.data().Spending,
        income: docSnap.data().totalIncome,
        incomeGoal: docSnap.data().incomeGoal,
        spendingLimit: docSnap.data().spendingLimit,
      });
    } else {
      // doc.data() will be undefined in this case
      //setSaving((debit) => 0);
      alert("Error Occured");
    }
    setLoading(false);
  };

  const submit = async () => {
    const docs = {
      Mode: mode,
      Remark: info,
      Amount: amount,
      timestamp: serverTimestamp(),
    };
    setHistory([docs, ...history]);
    const subCollectionRef = collection(
      db,
      "Rujhan",
      "RujhanHistory",
      "TransactionHistory"
    );
    await addDoc(subCollectionRef, docs);
    calculateSavingSpending();
    setInfo("");
    setAmount(0);
  };

  const handleClickInput = () => {
    inputButtonRef.current.style.backgroundColor = "#C4C4C4";
    outputButtonRef.current.style.backgroundColor = "#E5E5E5";
    setMode((mode) => "input");
  };

  const handleClickOutput = () => {
    inputButtonRef.current.style.backgroundColor = "#E5E5E5";
    outputButtonRef.current.style.backgroundColor = "#C4C4C4";
    setMode((mode) => "Output");
  };

  // const setButtonActive = () => {
  //   if()
  // }

  useEffect(() => {
    getGeneralInfo();
    getHistory();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center w-100">
        <h1 className="dashboard-title">Rujhan's Dashboard</h1>
        <button
          className="customize-button"
          onClick={() => navigate("/college-money-tracker/update")}
        >
          Customize
        </button>
      </div>
      <div className="w-100 dashboard-section my-5">
        <div className="dashboard-block d-flex flex-wrap justify-content-center">
          <div
            className="block d-flex justify-content-around flex-column mx-2 my-2"
            style={{ backgroundColor: "#46BC6E", color: "#121C72" }}
          >
            <p className="title-dashboard">Saving</p>
            <h3 className="amount-dashboard">
              RM {loading ? <p>...</p> : basicInfo.saving}
            </h3>
          </div>
          <div
            className="block d-flex justify-content-around flex-column mx-2 my-2"
            style={{ backgroundColor: "#BC2222", color: "#000000" }}
          >
            <p className="title-dashboard">Spending</p>
            <h3 className="amount-dashboard">
              RM {loading ? <p>...</p> : basicInfo.spending}
            </h3>
          </div>
          <div
            className="block d-flex justify-content-around flex-column mx-2 my-2"
            style={{ backgroundColor: "#FFFFFF", color: "#3BBB5F" }}
          >
            <p className="title-dashboard">Income</p>
            <h3 className="amount-dashboard">
              RM {loading ? <p>...</p> : basicInfo.income}
            </h3>
          </div>
          <div
            className="block d-flex justify-content-around flex-column mx-2 my-2"
            style={{ backgroundColor: "#BB693B", color: "#000000" }}
          >
            <p className="title-dashboard">Income Goal</p>
            <h3 className="amount-dashboard">
              RM {loading ? <p>...</p> : basicInfo.incomeGoal}
            </h3>
          </div>
          <div
            className="block d-flex justify-content-around flex-column mx-2 my-2"
            style={{ backgroundColor: "#682CE8", color: "#000000" }}
          >
            <p className="title-dashboard">Spending Limit</p>
            <h3 className="amount-dashboard">
              RM {loading ? <p>...</p> : basicInfo.spendingLimit}
            </h3>
          </div>
        </div>
      </div>
      <div className="inputOutput-block">
        <div className="inputOutputButtonGroup">
          <button
            className="inputOutput-button inputButton"
            onClick={handleClickInput}
            ref={inputButtonRef}
            style={{ backgroundColor: "#C4C4C4" }}
          >
            Input
          </button>
          <button
            className="inputOutput-button outputButton"
            onClick={handleClickOutput}
            ref={outputButtonRef}
            // style= {!isInput && { backgroundColor: "#C4C4C4" }}
          >
            Output
          </button>
        </div>
      </div>
      <div className="d-flex detail-block my-5">
        <div className="mx-5">
          <p>Amount</p>
          <input
            type="number"
            className="input-box"
            placeholder="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mx-5 ">
          <p>Remarks</p>
          <input
            type="text"
            className="input-box"
            placeholder="information"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button className="submit-button" onClick={() => submit()}>
          Submit
        </button>
      </div>
      <div className="latestTransaction-block my-5">
        <h1 className="latestTransaction-title">Latest Transaction</h1>
        {history &&
          history.map((item) => (
            <div className="transaction-card my-3">
              <p className="transaction-card-title">{item.Remark}</p>
              <h1 className="transaction-card-price">RM {item.Amount}</h1>
            </div>
          ))}
      </div>
    </>
  );
}

export default Dashboard;
