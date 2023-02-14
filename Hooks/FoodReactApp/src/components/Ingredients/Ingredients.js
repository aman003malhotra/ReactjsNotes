import React, { useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

// When working with useReducer(), React will
// re-render the component whenever your reducer returns the new state.
const ingredientReducer = (currentIngredient, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD' :
      return [...currentIngredient, action.ingredient];
    case 'DELETE':
      return currentIngredient.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there');
  }
}

function Ingredients() {
  
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const {isLoading, error, data, sendRequest} = useHttp();

  // without dependancy then it will run after every render
  useEffect(() => {
    // setIsLoading(true);
    dispatchHttp({type:'SEND'});
    fetch('https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients.json')
    .then((response) => {
      // setIsLoading(false);
      dispatchHttp({type:'RESPONSE'});
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
      // setIngredients(loadedIngredients);
      dispatch({type:'SET', ingredients:loadedIngredients})

    })
  }, []);
  
  const filteredIngredientHandler = useCallback((filteredIngredients) => {
    // setIngredients(filteredIngredients);
    dispatch({type:'SET', ingredients:filteredIngredients})
  }, []);

  const addIngredient = useCallback(ingridient => {

    // setIsLoading(true);
    dispatchHttp({type:'SEND'});
    
    fetch('https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients.json',
    {
      method:'POST',
      body:JSON.stringify(ingridient),
      header:{ 'Content-Type':'application/json'}
    }).then(response =>{
      // setIsLoading(false);
      dispatchHttp({type:'RESPONSE'});

      return response.json();
    }).then(responseData => {
      console.log(responseData);
      // setIngredients(prevIngredient => [
      //   ...prevIngredient, 
      //   {id:responseData.name, ...ingridient}]);
      dispatch({type:'ADD', ingredient:{id:responseData.name, ...ingridient}});
    });
  }, []);

  const removeIngredientHandler = useCallback((ingredientId) =>{
   sendRequest(`https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
   'DELETE'
   );
  }, [sendRequest]);

  const clearError = () => {
    // setError(null);
    // setIsLoading(false);
    dispatch({type:'CLEAR'});
  }
  return (
    <div className="App">
      {error & <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient = {addIngredient} 
        loading={isLoading}
      />
      <section>
        <Search filteredIngredient={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
