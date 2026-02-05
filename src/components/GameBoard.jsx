import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { registerHit, registerMiss, hideMole } from '../store/gameSlice';
import MoleSlot from './MoleSlot';

const GameBoard = () => {
    const dispatch = useDispatch();
    const { activeMole, feedbackStatus } = useSelector((state) => state.game);
    const slots = Array(6).fill(null);

    const handleSlotClick = (index) => {
        // If status already exists, ignore repeated clicks.
        if (feedbackStatus) return;

        if (index === activeMole) {
            dispatch(registerHit());
        } else {
            dispatch(registerMiss());
        }
    };

    return (
        <BoardContainer>
            {slots.map((_, index) => (
                <div key={index} onClick={() => handleSlotClick(index)}>
                    <MoleSlot
                        isMoleVisible={index === activeMole}
                        status={index === activeMole ? feedbackStatus : null}
                    />
                </div>
            ))}
        </BoardContainer>
    );
};

export default GameBoard;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  padding: 30px;
  background-color: #f8c8dc;
  border: 2px solid #333;
  border-radius: 10px;

`;