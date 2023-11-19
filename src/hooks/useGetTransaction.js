import { useEffect, useState } from "react"
import {query, collection,where, orderBy, onSnapshot} from 'firebase/firestore';
import { db } from '../config/fireabseConfig';
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = ()=>{
  const [transactions, setTransactions] = useState([]);
  const [balanceTotal, setBalanceTotal] = useState({balance:0.0, income: 0.0, expenses: 0.0})
  const transactionRef = collection(db, 'transactions');
  const {userID} = useGetUserInfo();

  const getTransaction = async ()=>{

     const queryTransaction = query(transactionRef, where("userID", "==", userID), orderBy("createdAt")
     );

     onSnapshot(queryTransaction, (snapshot)=>{
        let docs =[];
        let totalIncome=0;
        let totalExpenses =0;

        snapshot.forEach((doc)=>{
            const data = doc.data();
            const id = doc.id;

            docs.push({...data,id})
            
            if(data.transactionType==="expense"){
                totalExpenses+= Number (data.transactionAmount)
            }
            else{
                totalIncome+= Number (data.transactionAmount)
            }

        });
        setTransactions(docs);

        let balance = totalIncome- totalExpenses

        setBalanceTotal({
            balance,
            expenses: totalExpenses,
            income: totalIncome,
        })
     })
  };

  useEffect(()=>{
    getTransaction();
  },[]);

    return {transactions, balanceTotal}
}