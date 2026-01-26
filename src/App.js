import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks
import { startGame } from './store/gameSlice';
import useGameLoop from './hooks/useGameLoop'; // Наш ігровий цикл

import Header from './components/Header';
import GameBoard from './components/GameBoard';
import StatusBar from './components/StatusBar';

function App() {
  const dispatch = useDispatch();
  const { gameStatus } = useSelector((state) => state.game);

  // Активуємо ігровий двигун
  useGameLoop();

  return (
    <AppWrapper>
      <Header />

      {/* Показуємо кнопку Start, якщо гра не йде */}
      {gameStatus !== 'PLAYING' && (
        <Overlay>
          <StartButton onClick={() => dispatch(startGame())}>
            {gameStatus === 'IDLE' ? 'START GAME' : gameStatus === 'WON' ? 'YOU WON! PLAY AGAIN' : 'GAME OVER. TRY AGAIN'}
          </StartButton>
        </Overlay>
      )}

      <GameArea>
        <GameBoard />
        <StatusBar />
      </GameArea>
    </AppWrapper>
  );
}

export default App;

// --- Add these styles ---
const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const StartButton = styled.button`
  padding: 20px 40px;
  font-size: 24px;
  background: #333;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover { background: #555; }
`;

const AppWrapper = styled.div`
  /* ... твої старі стилі ... */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  background-color: #fff;
  position: relative; /* Для Overlay */
`;
// ... GameArea той самий ...
const GameArea = styled.div`
  display: flex;
  gap: 50px; /* Відстань між дошкою та статус баром */
  align-items: flex-start;
`;