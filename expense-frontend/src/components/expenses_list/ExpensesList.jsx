/* eslint-disable react/prop-types */
import ExpenseItem from '../expense_item/ExpenseItem';
import { useEffect, useState } from 'react';
import Select from 'react-select'
import './ExpensesList.css';

function ExpensesList(props) {
    const { list , deleteExpense ,editExpense } = props;
    const [filterExpense,setFilterExpense]= useState(null);
    const [option,setOption] = useState(null);

    const options = [
        // {value : "2009",label:"2009"},
      ];

      useEffect(()=>{list.map((item) => {
        options.push({value: new Date(item.date).getFullYear(),label: new Date(item.date).getFullYear()})
        options.sort((a,b) => (parseInt(a.value) - parseInt(b.value)))
    })
    },[list]);

    const [selectedOption, setSelectedOption] = useState("");

  var handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption.value);
    const filterValue=selectedOption.value.toString();
    console.log(filterValue);
    const filteredExpense = list.filter((obj) => {
      const year=new Date(obj.date).getFullYear().toString();
      // console.log(year);
      return year === filterValue;
    })
    if(option === null || option.length < options.length ) setOption(options);
    console.log(filteredExpense);
    setFilterExpense(filteredExpense);
  };
    
  return (
    <div className='expense-filter'>
        <div className='expense-filter-header'>
                <h1>Filter By Year</h1>
                
                <Select options={option || options} className='expense-dropdown' onChange={handleChange} />
                </div>

        <div className='expenses-list'>
            
            {
                list.length === 0?(
                    <div className='empty-list'>
                        No Expenses foundd
                    </div>
                ):filterExpense?filterExpense.map( (item,index) => {
                    return (
                        <ExpenseItem expense={item} key={index} deleteExpense={deleteExpense} editExpense={editExpense} />
                    );
                }):list.map( (item,index) => {
                    return (
                        <ExpenseItem expense={item} key={index} deleteExpense={deleteExpense} editExpense={editExpense} />
                    );
                })
            }
        </div>
    </div>
  )
}

export default ExpensesList;