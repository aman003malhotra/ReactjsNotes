import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

function Ingredients() {
  
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // without dependancy then it will run after every render
  useEffect(() => {
    setIsLoading(true);

    fetch('https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients.json')
    .then((response) => {
      setIsLoading(false);

      return response.json()
    })
    .then((responseData) => {
      const loadedIngredients = [];
      for(const key in responseData){
        loadedIngredients.push({
          id:key, 
          title:responseData[key].title,
          amount:responseData[key].amount
        });
      }
      setIngredients(loadedIngredients);
    })
  }, []);
  
  const filteredIngredientHandler = useCallback((filteredIngredients) => {
    setIngredients(filteredIngredients);
  }, []);

  const addIngredient = ingridient => {
    setIsLoading(true);
    fetch('https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients.json',
    {
      method:'POST',
      body:JSON.stringify(ingridient),
      header:{ 'Content-Type':'application/json'}
    }).then(response =>{
      setIsLoading(false);
      return response.json();
    }).then(responseData => {
      console.log(responseData);
      setIngredients(prevIngredient => [
        ...prevIngredient, 
        {id:responseData.name, ...ingridient}]);
    });
  }

  const removeIngredientHandler = (ingredientId) =>{
    setIsLoading(true);
    fetch(`https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients/${ingredientId}n`,
    {
      method:'DELETE'
    }).then(response =>{
      setIsLoading(false);
      setIngredients(prevIngredient => {
        return prevIngredient.filter(ingredient => {return ingredient.id !== ingredientId});
      })
    }).catch(err => setError('Something went wrong'));  
  }

  // state updates are batched together
//   in the same synchronous (!) execution cycle (e.g. in the same function) will NOT trigger two component re-render cycles.

// Instead, the component will only re-render once and both state updates will be applied simultaneously.

// Not directly related, but also sometimes misunderstood, is when the new state value is available.
  const closeError = () => {
    setError(null);
    setIsLoading(false);
  }
  return (
    <div className="App">
      {error & <ErrorModal onClose={closeError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient = {addIngredient} loading={isLoading}/>

      <section>
        <Search filteredIngredient={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
