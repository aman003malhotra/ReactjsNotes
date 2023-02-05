import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  // first element is always the current state value
  // in class based components the state must be an object
  // const [ inputState, setInputState ] = useState({title:'',amount:''});
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');




  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title:title, amount:amount});
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title" 
              value={title}
              // events in react are different from DOM events 
              onChange={event =>{
                setTitle(event.target.value)
              }}
              />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              value={amount} 
              // event does not get updated every time in react
              onChange={event =>{
                setAmount(event.target.value)
              }}
              />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
