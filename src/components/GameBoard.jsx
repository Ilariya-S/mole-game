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
        // Якщо вже є статус (гравець вже клікнув), ігноруємо повторні кліки
        if (feedbackStatus) return;

        if (index === activeMole) {
            // Влучив!
            dispatch(registerHit());

            // Імітація затримки: показуємо зелений колір, потім ховаємо
            setTimeout(() => {
                dispatch(hideMole());
            }, 1000); // Пауза, щоб гравець побачив результат (в ТЗ 40мс, але це дуже швидко, ставлю більше для тесту)
        } else {
            // Промазав (клік не по тій норі)
            dispatch(registerMiss());
            // Те саме для промаху
            setTimeout(() => {
                dispatch(hideMole());
            }, 500);
        }
    };

    return (
        <BoardContainer>
            {slots.map((_, index) => (
                <div key={index} onClick={() => handleSlotClick(index)}>
                    <MoleSlot
                        isMoleVisible={index === activeMole}
                        // Передаємо статус, тільки якщо це активна нора
                        status={index === activeMole ? feedbackStatus : null}
                    />
                </div>
            ))}
        </BoardContainer>
    );
};

export default GameBoard;
// ... стилі ті самі ...
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