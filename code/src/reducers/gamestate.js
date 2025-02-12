import { createSlice } from '@reduxjs/toolkit';
import { ui } from "./ui";
import { GAME_URL } from '../components/utils/urls.js'
import { ACTION_URL } from '../components/utils/urls.js'

// initialState should properties that you will reuse in the multiple componenents as Vanessa said :)  
export const gamestate  = createSlice({
  name: 'gamestate ',
  initialState: {
    username: '',
    gameStatus: {},
    isLoading: false,
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
    fetch(GAME_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((json) => {dispatch(gamestate.actions.setGameStatus(json))})
      .finally(() => dispatch(gamestate.actions.setLoading(false)))
  };
};

/* takes in two arguments username and direction that user choose */
export const nextMove = (username, direction) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));

    fetch(ACTION_URL, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }, 
      // setting username and direction to the json here and sending to backend
      body: JSON.stringify({ username, type: 'move', direction }),
    })
      .then((res) => res.json())
      .then((json) => {dispatch(gamestate.actions.setGameStatus(json))})
      .finally(() => dispatch(gamestate.actions.setLoading(false)))
  };
};    



