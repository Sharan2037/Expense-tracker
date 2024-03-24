/* eslint-disable react/no-unknown-property */
import ExpensesList from '../expenses_list/ExpensesList';
import ExpenseForm from '../expense_form/ExpenseForm';
// import { nanoid } from 'nanoid'
// model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"
import { useEffect, useState } from 'react';

import './Expenses.css';


function Expenses() {
    const [expenses,setExpenses]=useState([]);
    const [editId,setEditId]=useState(null);
    const [editObj,setEditObj]=useState(null);

    const getData = async() => {
      const res = await fetch('http://localhost:5000/expense/get')
      const json = await res.json()
      console.log(json)
      setExpenses(json)
    }

    useEffect(() => {
      getData()
    }, [])

    const addExpenses = async (newObj) => {
        console.log(newObj);
        await fetch('http://localhost:5000/expense/create', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newObj)
        })
        setExpenses([...expenses , newObj ]);
    }

    const deleteExpenses = (id) => {
        console.log(id);
        const temExpense = expenses.filter((obj) => obj.id !== id);
        setExpenses([...temExpense]);
    }

    const updateExpenses = (updObj) => {
      const temExpense = expenses.map((obj) => {
        return (obj.id===updObj.id?updObj:obj)
      })
      // console.log(temExpense);
      setExpenses(temExpense);
    }

    const editExpenses = (id)=>{
      console.log(id);
      setEditId(id);
      const obj=expenses.find((expense) => expense.id===id);
      setEditObj(obj);
      // console.log(obj);
    }

    
   

  return (
    <div className='expenses'>
        <h1 align="center" >Expenses Track</h1>
        <ExpenseForm addExpense={addExpenses} editId={editId} editObj={editObj} updateExpense={updateExpenses}/>
        <div className='expenses-list-container'>
            <h1 align="center" >Expenses List</h1>
            
            <ExpensesList list={expenses} deleteExpense={deleteExpenses} editExpense={editExpenses} />
            
        </div>
        
    </div>
  )
}

export default Expenses;