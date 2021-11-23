import { createSlice } from '@reduxjs/toolkit';
import { ui } from "./ui";

export const gamestate  = createSlice({
  name: 'gamestate ',
  initialState: {
		username: '',
    gameStatus: {},
		isLoading: false,
    //history: []
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setGameStatus: (state, action) => {
      state.gameStatus= action.payload;
    },  
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRestartGame: (state) => {
      state.username = '';
      state.gameStatus = {}; 
    }
  }
});

export const fetchGame = (username) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetch('https://wk16-backend.herokuapp.com/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ username: username}),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(gamestate.actions.setGameStatus(json));
        dispatch(ui.actions.setLoading(false));
      });
  };
};

export const nextMove = (username, direction) => {
  return (dispatch) => {
    fetch('https://wk16-backend.herokuapp.com/action', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ username, type: 'move', direction }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(gamestate.actions.setGameStatus(json)) //add reducer in the end
      })
      .finally(() => dispatch(gamestate.actions.setLoading(false)))
  };
};    



