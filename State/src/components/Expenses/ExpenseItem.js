import { useState } from 'react';
import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';
import Card from '../UI/Card';

function ExpenseItem(props){

    const [title, setTitle] = useState(props.item);
    const clickHandler = () =>{
        console.log("Hello");
        setTitle("Hello!")
    }

    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date}/>
            <div className="expense-item__description">
                <h2 >{title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            {/* You do not add bracket with the function otherwise it will execute the function while parsing*/}
            <button onClick={clickHandler}>Change Title</button>
        </Card>
    );
}

export default ExpenseItem;