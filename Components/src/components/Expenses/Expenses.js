import ExpenseItem from './ExpenseItem'
import './Expenses.css';
import Card from '../UI/Card';

function Expenses({expenses}){
    return(
        <Card className='expenses'>
            <ExpenseItem 
            item = {expenses[0].title}
            amount = {expenses[0].amount}
            date = {expenses[0].date}
        ></ExpenseItem>
        <ExpenseItem 
            item = {expenses[1].title}
            amount = {expenses[1].amount}
            date = {expenses[1].date}
        ></ExpenseItem>
        <ExpenseItem 
            item = {expenses[2].title}
            amount = {expenses[2].amount}
            date = {expenses[2].date}
        ></ExpenseItem>
        <ExpenseItem 
            item = {expenses[3].title}
            amount = {expenses[3].amount}
            date = {expenses[3].date}
        ></ExpenseItem> 
        </Card>
           
    )
}

export default Expenses;