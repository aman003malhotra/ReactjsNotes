import { useReducer } from "react";

// each component gets its own snapshot
const httpReducer = (currHttpState, action) =>{
    switch(action.type){
      case 'SEND':
        return {loading : true, error : null, data:null};
      case 'RESPONSE':
        return {...currHttpState, loading: false, data:action.responseData};
      case 'ERROR':
        return {loading:false, error: action.errorData};
      case 'CLEAR':
        return {...currHttpState, error:null};
      default:
        throw new Error('Should not be reached')
    }
}

// it will get re-rendered whenever the component containing the hook will render.
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading : false,
    error:null,
    data:null
    });

  const sendRequest = (url, method, body) => {
    dispatchHttp({type:'SEND'});
    fetch(url,
    {
        method:method,
        body:body,
        header:{
            'Content-Type':'application/json'
        }
    }).then(response =>{
        return response.json();

    }).then((responseData) => {
        dispatchHttp({type:'RESPONSE', responseData:responseData});

    }).catch((error) => {
        dispatchHttp({type:'ERROR', errorData:'Something went Wrong'});
    });
  };

  return {
    isLoading:httpState.loading,
    data:httpState.data,
    error:httpState.error
  }
  
};



export default useHttp