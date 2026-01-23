import React from 'react';
import styled from 'styled-components';
import MoleSlot from './MoleSlot';

const GameBoard = () => {
    // Поки створюємо масив з 6 пустих елементів для імітації сітки
    const slots = Array(6).fill(null);

    return (
        <BoardContainer>
            {slots.map((_, index) => (
                // Для прикладу зробимо першого крота видимим (index === 0)
                <MoleSlot key={index} isMoleVisible={index === 0} />
            ))}
        </BoardContainer>
    );
};

export default GameBoard;

// --- STYLES ---
const BoardContainer = styled.div`
  background-color: #f8c8dc; /* Рожевий колір */
  padding: 30px;
  border: 2px solid #333;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 колонки */
  grid-template-rows: repeat(2, 1fr);    /* 2 рядки */
  gap: 20px;
`;