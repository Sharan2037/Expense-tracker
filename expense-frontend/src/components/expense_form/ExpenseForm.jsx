/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './ExpenseForm.css'
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

function ExpenseForm(props) {
    const {addExpense,editId,editObj,updateExpense} = props;
    const [title,setTitle] = useState('');
    const [amount,setAmount] = useState('');
    const [date,setDate] = useState('');
    const [isform,setIsform] = useState(true);
    const [isEdit,setIsEdit] = useState(false);
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    useEffect(()=>{
        if(editId){
            setTitle(editObj.title);
            setAmount(editObj.amount);
            setDate(editObj.date.toISOString().substring(0,10));
            setIsEdit(true);
        }

    },[editId]);

    const handleAmountChange = (event) => {setAmount(event.target.value);}
    const handleDateChange = (event) =>{setDate(event.target.value);}

    const handleFormSubmit = (event) => {
        event.preventDefault();
        //toastify for warning
        if(title==='' || amount==='' || date===''){
            toast.warn('please enter the values ...', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }
        // console.log(title,amount,date);
        const data = {id:nanoid(), title : title,amount : amount,date : new Date(date)};

        {
            isEdit?(
                updateExpense({id:editId,title:title,amount : amount,date : new Date(date)}),
                setIsEdit(false),toast.success('Edited Successfully...',{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })):(addExpense(data),toast.success('Added Successfully...',{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }))
        }
        setAmount('');
        setDate('');
        setTitle('');
        
    }

    const handleCancelChange = (e) => {
        e.preventDefault();
        setIsform(false);
    }

    const handleForm = (e) =>{
        e.preventDefault();
        setIsform(true);
        setIsEdit(false);
        setAmount('');
        setDate('');
        setTitle('');
    }
    

  return (
    <div className='new-expense'>
        {
            isform?<><form className='expense-form' onSubmit={handleFormSubmit}>
            <div className='input-group'>
                <label>Title</label>
                <input type='text' placeholder='Enter the title'  value={title} onChange={handleTitleChange} />
            </div>
            <div className='input-group'>
                <label>Amount</label>
                <input type='text' placeholder='Enter the Amount'  value={amount} onChange={handleAmountChange} />
            </div>
            <div className='input-group'>
                <label>Date</label>
                <input type='date' onChange={handleDateChange} value={date}  />
            </div>

            <div className='form-control-buttons'>
                <button onClick={handleCancelChange}>Cancel</button>
                <button type='submit'>{isEdit?"Edit":"Add"} Expense</button>
            </div>
        </form></>:(<div className='header'>
            <button onClick={handleForm}>New Expense</button>
        </div>)
        }
        
        
    </div>
  )
}

export default ExpenseForm