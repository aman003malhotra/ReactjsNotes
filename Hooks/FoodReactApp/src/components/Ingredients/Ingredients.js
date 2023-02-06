import React, { useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

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


const httpReducer = (currHttpState, action) =>{
  switch(action.type){
    case 'SEND':
      return {loading : true, error : null};
    case 'RESPONSE':
      return {...currHttpState, loading: false};
    case 'ERROR':
      return {loading:false, error: action.errorData};
    case 'CLEAR':
      return {...currHttpState, error:null};
    default:
      throw new Error('Should not be reached')
  }
}

function Ingredients() {
  
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading : false, error:null});


  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

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
    // setIsLoading(true);
    dispatchHttp({type:'SEND'});

    fetch(`https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
    {
      method:'DELETE'
    }).then(response =>{
      // setIsLoading(false);
      dispatchHttp({type:'RESPONSE'});

      dispatch({type:'DELETE', id:ingredientId});
      // setIngredients(prevIngredient => {
      //   return prevIngredient.filter(ingredient => {return ingredient.id !== ingredientId});
      // })
    }).catch((error) => {
      dispatchHttp({type:'ERROR', errorData:'Something went Wrong'});
    });
      // err => setError('Something went wrong')  
  }, [])

// state updates are batched together
//   in the same synchronous (!) execution cycle (e.g. in the same function) will NOT trigger two component re-render cycles.
// Instead, the component will only re-render once and both state updates will be applied simultaneously.
// Not directly related, but also sometimes misunderstood, is when the new state value is available.
  const clearError = () => {
    // setError(null);
    // setIsLoading(false);
    dispatch({type:'CLEAR'});
  }
  return (
    <div className="App">
      {httpState.error & <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient = {addIngredient} loading={httpState.loading}/>

      <section>
        <Search filteredIngredient={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
