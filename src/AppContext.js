import React, { createContext, useEffect, useState } from "react";
import { db } from "./config";
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
export const AppContext = createContext();

export const InfoProvider = (props) => {
  const [basicInfo, setBasicInfo] = useState({
    saving: 0,
    spending: 0,
    income: 0,
    incomeGoal: 0,
    spendingLimit: 0,
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setHistory(historyArr.reverse());
  };

  useEffect(() => {
    getHistory();
    getGeneralInfo();
  }, []);

  return (
    <AppContext.Provider
      value={[
        basicInfo,
        setBasicInfo,
        history,
        setHistory,
        loading,
        setLoading,
      ]}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
