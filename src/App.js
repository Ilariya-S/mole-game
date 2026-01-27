import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'; 
import { startGame } from './store/gameSlice';
import useGameLoop from './hooks/useGameLoop';

import Header from './components/Header';
import GameBoard from './components/GameBoard';
import StatusBar from './components/StatusBar';

function App() {
  const dispatch = useDispatch();
  const { gameStatus } = useSelector((state) => state.game);

  useGameLoop();

  return (
    <AppWrapper>
      <Header />

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

const Overlay = styled.div`
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StartButton = styled.button`
  padding: 20px 40px;
  font-size: 24px;
  background: #f8c8dc;
  color: white;
  border: 2px solid #333;
  border-radius: 10px;
  cursor: pointer;
  &:hover { background: #efa5c4; }
`;

const AppWrapper = styled.div`
  position: relative; 
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 50px;
  background-color: #fff;
`;
const GameArea = styled.div`
  display: flex;
  gap: 50px;
  align-items: flex-start;
`;