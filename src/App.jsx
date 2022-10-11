import { useState, useReducer } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { postReducer } from './postReducer';
import { INITIAL_STATE } from './formReducer';
import { ACTION_TYPES } from './postActionsTypes';
import Form from './Form';

const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

function App() {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  const handlerFetch = () => {
    dispatch({ type: ACTION_TYPES.FETCH_START });
    return fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: error });
      });
  };

  return (
    <div className="App">
      <button onClick={handlerFetch}>Fetchear</button>
      <div>{state.loading ? 'Loading data...' : state.post?.body}</div>
      <span>{state.error && 'Something went wrong!'}</span>

      <h2>FORMULARIO</h2>
      <Form />
    </div>
  );
}

export default App;
