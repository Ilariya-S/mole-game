import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    score: 0,
    misses: 0,
    timeLeft: 4000,
    difficulty: 1,
    activeMole: null,
    lastMoleIndex: null,
    feedbackStatus: null, // 'hit' (green), 'miss' (red) або null
    gameStatus: 'IDLE', // 'IDLE', 'PLAYING', 'WON', 'LOST'
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state) => {
            state.score = 0;
            state.misses = 0;
            state.timeLeft = 4000;
            state.difficulty = 1;
            state.gameStatus = 'PLAYING';
            state.activeMole = null;
            state.lastMoleIndex = null;
            state.feedbackStatus = null;
        },
        stopGame: (state, action) => {
            state.gameStatus = action.payload; // 'WON' або 'LOST'
            state.activeMole = null;
        },
        showMole: (state) => {
            // Choose random mole
            let newMole;
            do {
                newMole = Math.floor(Math.random() * 6); //floor - округлення
            } while (newMole === state.lastMoleIndex); // check if it's not the same hole

            state.activeMole = newMole;
            state.lastMoleIndex = newMole;
            state.feedbackStatus = null;
        },
        hideMole: (state) => {
            state.activeMole = null;
        },
        registerHit: (state) => {
            if (state.gameStatus !== 'PLAYING') return;
            
            state.score += 1;
            state.feedbackStatus = 'hit';
            //check if WON
            if (state.score >= 100) {
                state.gameStatus = 'WON';
                state.activeMole = null;
            }
            // upgrade dificulty of game
            if (state.score % 10 === 0 && state.timeLeft > 500) {
                state.timeLeft -= 200;
                state.difficulty += 1;
            }
        },
        registerMiss: (state) => {
            if (state.gameStatus !== 'PLAYING') return;

            state.misses += 1;
            state.feedbackStatus = 'miss'; 

            //check if LOST
            if (state.misses >= 3) {
                state.gameStatus = 'LOST';
                state.activeMole = null;
            }
        },
        registerTimeoutMiss: (state) => {
            if (state.gameStatus !== 'PLAYING') return;
            
            state.misses += 1;
            state.feedbackStatus = null;

            //check if LOST
            if (state.misses >= 3) {
                state.gameStatus = 'LOST';
                state.activeMole = null;
            }
        }
    },
});

export const {
    startGame,
    stopGame,
    showMole,
    hideMole,
    registerHit,
    registerMiss,
    registerTimeoutMiss
} = gameSlice.actions;

export default gameSlice.reducer;