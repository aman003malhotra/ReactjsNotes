import React, {useState} from "react";
import './ExpenseForm.css';

function ExpenseForm(){
    // const [enteredTitle, setEnteredTitle] = useState('');
    // const [enteredAmount, setEnteredAmount] = useState('');
    // const [enteredDate, setEnteredDate] = useState('');

    const [userInput, setUserInput] = useState({
        enteredTitle:"",
        enteredAmount:"",
        enteredDate:""
    });

    const titleChangeHandler = (e) => {
        // setEnteredTitle(e.target.value);
        setUserInput((prevState) => {
            return{
            ...prevState,
            enteredTitle:e.target.value,
            }           
        });
    }

    const amountChangeHandler = (e) => {
        // setEnteredAmount(e.target.value);
        setUserInput((prevState) => {
            return{
                ...prevState,
                enteredAmount:e.target.value,
            }           
        });
    }

    const dateChangeHandler = (e) => {
        // .value is always a string
        // setEnteredDate(e.target.value);
        setUserInput((prevState) => {
            return{
            ...prevState,
            enteredDate:e.target.value,  
            }         
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let {enteredTitle, enteredAmount, enteredDate} = userInput;
        const expenseData = {
            title:enteredTitle,
            amount:enteredAmount,
            date:new Date(enteredDate)
        }
        console.log(expenseData);
    }

    return(
        <form onSubmit={submitHandler}>
           <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    {/* onInput can also be used */}
                    <input 
                    type="text" 
                    onChange={titleChangeHandler} 
                    value={userInput.enteredTitle}
                    /> 
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input  
                    type="number" 
                    min="0.01" 
                    step="0.01" 
                    value={userInput.enteredAmount}
                    onChange={amountChangeHandler}
                    /> 
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input 
                    type="date" 
                    min="2019-01-01" 
                    max="2022-12-31" 
                    onChange={dateChangeHandler} 
                    value={userInput.enteredDate}/> 
                </div>
            </div> 
            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>    
            </div>
        </form>
    )
}

export default ExpenseForm;