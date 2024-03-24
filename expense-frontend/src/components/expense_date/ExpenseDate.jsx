/* eslint-disable react/prop-types */
import './ExpenseDate.css';

function ExpenseDate(props) {
    const {date} = props;
    const dateObj = new Date(date)
    const year = dateObj.getFullYear();
    const day = dateObj.toLocaleString('en-US', { day: 'numeric' });
  const month = dateObj.toLocaleString('en-US', { month: 'long' });

  return (
    <div className='expense-date'>
        <div className='expense-date-month'>{month}</div>
        <div className='expense-date-day'>{day}</div>
        <div className='expense-date-year'>{year}</div>
    </div>
  )
}

export default ExpenseDate;