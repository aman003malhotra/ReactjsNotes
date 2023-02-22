import React from "react";
import ExpenseForm from "./ExpenseForm";
import './NewExpense.css'

const NewExpenses = (props) => {
    const saveExpenseData = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id:Math.random().toString()
        }
        props.onAddExpenseHandler(expenseData);
    }
    return(
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseData} />
        </div>
    );
}

export default NewExpenses;