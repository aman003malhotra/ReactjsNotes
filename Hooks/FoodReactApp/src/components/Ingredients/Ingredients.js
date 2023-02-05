import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  
  const [ingredients, setIngredients] = useState([]);

  // without dependancy then it will run after every render
  useEffect(() => {
    fetch('https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients.json')
    .then((response) => {
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
    fetch('https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients.json',
    {
      method:'POST',
      body:JSON.stringify(ingridient),
      header:{ 'Content-Type':'application/json'}
    }).then(response =>{
      return response.json();
    }).then(responseData => {
      console.log(responseData);
      setIngredients(prevIngredient => [
        ...prevIngredient, 
        {id:responseData.name, ...ingridient}]);
    });
  }

  const removeIngredientHandler = (ingredientId) =>{
    fetch(`https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
    {
      method:'DELETE'
    }).then(response =>{
      setIngredients(prevIngredient => {
        prevIngredient.filter(ingredient => ingredient.id !== ingredientId);
      })
    }).catch(err => console.log(err));
    
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredient}/>

      <section>
        <Search filteredIngredient={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={() => {removeIngredientHandler(ingredients.id)}}/>
      </section>
    </div>
  );
}

export default Ingredients;
