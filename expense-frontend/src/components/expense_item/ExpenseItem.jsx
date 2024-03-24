/* eslint-disable react/prop-types */
import ExpenseDate from '../expense_date/ExpenseDate';
import './ExpenseItem.css';

function ExpenseItem(props) {
    const {id,title,date,amount} = props.expense;
    const {deleteExpense , editExpense} = props;

    const handleDelete = () => {
      // e.preventDefault();
      deleteExpense(id);
      // console.log(id);
    }

    const handleEdit = ()=> editExpense(id);
    
  return (
    <div className='card expense-item'>
        <ExpenseDate date={date} />
        <div className='expense-name'>{title}</div>
        <div className='expense-amount'>₹ {amount}</div>
        <div className='expense-button'>
            <div className='expense-delete' onClick={handleDelete}>Delete</div>
            <div className='expense-edit' onClick={handleEdit} >Edit</div>
        </div>
       
    </div>
  )
}

export default ExpenseItem;

