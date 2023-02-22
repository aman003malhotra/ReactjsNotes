import ExpenseItem from './ExpenseItem'
import './Expenses.css';
import Card from '../UI/Card';

function Expenses({expenses}){
    return(
        <Card className='expenses'>
            {expenses.map((expense) => (
                <ExpenseItem key={expense.id}
                item = {expense.title}
                amount = {expense.amount}
                date = {expense.date}
                ></ExpenseItem>
            ))}
        </Card>
           
    )
}

export default Expenses;