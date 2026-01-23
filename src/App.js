import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import StatusBar from './components/StatusBar';

function App() {
  return (
    <AppWrapper>
      <Header />
      <GameArea>
        <GameBoard />
        <StatusBar />
      </GameArea>
    </AppWrapper>
  );
}

export default App;

// --- STYLES ---
const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  background-color: #fff; /* Білий фон сторінки */
`;

const GameArea = styled.div`
  display: flex;
  gap: 50px; /* Відстань між дошкою та статус баром */
  align-items: flex-start;
`;