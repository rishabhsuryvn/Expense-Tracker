import React, { useState } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransaction } from '../../hooks/useGetTransaction';
import "./style.css";
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import{signOut} from 'firebase/auth';
import { auth } from '../../config/fireabseConfig';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const {addTransaction} = useAddTransaction();
    const{transactions, balanceTotal} = useGetTransaction();

    const [description, setDescription]= useState('');
    const [transactionAmount, setTransactionAmount]= useState(0);
    const [transactionType, setTransactionType]= useState('expense');
    const {name, profilePhoto} = useGetUserInfo();

    const navigate = useNavigate();

    const {balance, income, expenses} = balanceTotal;



    const onSubmit= (e)=>{
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        });
        setDescription("");
        setTransactionAmount("");
    }

    const signUserOut = async()=>{
        await signOut(auth);
        localStorage.clear();
        navigate('/');
    }

  return (
    <>
    <div className='expense-tracker'>
     <div className="container">
        <h1>{name}'s Expense Tracker</h1>
        <div className="balance">
            <h3>Your Balance</h3>
            {balance>=0 ? <h2>Rs. {balance}</h2> : <h2>-Rs. {balance*-1}</h2> }
            
        </div>
        <div className="summary">
            <div className="income">
                <h4>Income</h4>
                <p>Rs. {income}</p>
            </div>
            <div className="expenses">
                <h4>Expenses</h4>
                <p>Rs. {expenses}</p>
            </div>
        </div>
       <form className='add-transaction' onSubmit={onSubmit}>
        <input type="text" placeholder='Description'
        value={description} required 
            onChange={(e)=>setDescription(e.target.value)}
        />
        <input type="number" placeholder='Amount' 
        value={transactionAmount} required 
            onChange={(e)=>setTransactionAmount(e.target.value)}
        />
        <input type="radio" value="expense" id="expense"
         checked={transactionType==="expense"}
        onChange={(e)=>setTransactionType(e.target.value)}
         />
        <label htmlFor='expense'>Expense</label>
        <input type="radio" value="income" id="income"
         checked={transactionType==="income"}
        onChange={(e)=>setTransactionType(e.target.value)}
         />
        <label htmlFor='income'>Income</label>

        <button type='submit'>Add Transaction</button>
       </form>

     </div>
     {profilePhoto && <div className='profile'>
     <img className='profile-photo' src={profilePhoto}></img>
     <button className='sign-out-button' onClick={signUserOut}>Sign Out</button>
     </div>
     }
    </div>
    <div className="transactions">
        <h3>Transactions</h3>
        <ul>
            {transactions.map((transaction)=>{
                return(
                    <li>
                        <h4>{transaction.description}</h4>
                        <p>Rs{transaction.transactionAmount} - <label 
                        style={{color: transaction.transactionType==="expense"? "red":"green"}}>
                        {transaction.transactionType}</label></p>
                    </li>
                )
            })}
        </ul>
    </div>
    </>
  )
}

export default Main
