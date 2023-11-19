import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from '../config/fireabseConfig';
import { useGetUserInfo } from './useGetUserInfo';

export const useAddTransaction = ()=>{
    const {userID}= useGetUserInfo();

    const addTransaction = async({
        description,
        transactionAmount,
        transactionType,
    })=>{
        await addDoc(collection(db, 'transactions'),{
          userID,
          description,
          transactionAmount,
          transactionType,
          createdAt: serverTimestamp(),
        })
    }
  return {addTransaction};
};