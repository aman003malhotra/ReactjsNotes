import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { filteredIngredient } = props;
  const [filtered, setFiltered] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() =>{
      if(filtered === inputRef.current.value){
        const query = filtered.length === 0?'':`?orderBy="title"&equalTo="${filtered}"`;
        fetch('https://react-http2-3ed33-default-rtdb.firebaseio.com/ingredients.json'+query)
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
          filteredIngredient(loadedIngredients);
        });
      }
        
    }, 500)

    // this ensure we always only have one timer
    return () => {
      clearInterval(timer);
    };
  }, [filtered, filteredIngredient, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={filtered} onChange={(event) => setFiltered(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
