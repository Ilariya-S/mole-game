import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    score: 0,
    misses: 0,
    timeLeft: 4000, // Початковий час на хід (4с = 4000мс)
    difficulty: 1,
    activeMole: null, // Індекс слота, де сидить кріт (0-5)
    feedbackStatus: null, // 'hit' (зелений), 'miss' (червоний) або null
    gameStatus: 'IDLE', // 'IDLE', 'PLAYING', 'WON', 'LOST'
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state) => {
            // Скидаємо все на початок
            state.score = 0;
            state.misses = 0;
            state.timeLeft = 4000;
            state.difficulty = 1;
            state.gameStatus = 'PLAYING';
            state.activeMole = null;
            state.feedbackStatus = null;
        },
        stopGame: (state, action) => {
            state.gameStatus = action.payload; // 'WON' або 'LOST'
            state.activeMole = null;
        },
        showMole: (state) => {
            // Вибираємо випадкову нору від 0 до 5
            let newMole;
            do {
                newMole = Math.floor(Math.random() * 6);
            } while (newMole === state.activeMole); // Щоб не з'являвся в тій же норі підряд

            state.activeMole = newMole;
            state.feedbackStatus = null;
        },
        hideMole: (state) => {
            state.activeMole = null;
        },
        registerHit: (state) => {
            state.score += 1;
            state.feedbackStatus = 'hit'; // Для підсвітки зеленим

            // Логіка складності: кожні 10 очок зменшуємо час
            if (state.score % 10 === 0 && state.timeLeft > 500) {
                state.timeLeft -= 100; // Пришвидшуємо гру
                state.difficulty += 1;
            }
        },
        registerMiss: (state) => {
            state.misses += 1;
            state.feedbackStatus = 'miss'; // Для підсвітки червоним
        },
        registerTimeoutMiss: (state) => {
            state.misses += 1;
            state.feedbackStatus = null; // Тайм-аут просто ховає крота без підсвітки (згідно ТЗ)
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