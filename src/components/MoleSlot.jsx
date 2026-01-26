import React from 'react';
import styled, { css } from 'styled-components';
import moleImg from '../assets/mole.png';
import holeImg from '../assets/hole.png';

// Додаємо проп status
const MoleSlot = ({ isMoleVisible = false, status = null }) => {
  return (
    <SlotContainer status={status}>
      <MoleImage src={moleImg} alt="mole" isVisible={isMoleVisible} />
      <HoleImage src={holeImg} alt="hole" />
    </SlotContainer>
  );
};

export default MoleSlot;

// Оновлюємо стилі
const SlotContainer = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  
  /* Зміна фону залежно від статусу */
  background-color: ${props =>
    props.status === 'hit' ? '#90EE90' : // Зелений
      props.status === 'miss' ? '#FF7F7F' : // Червоний
        '#e0e0e0' // Стандартний сірий
  };
  
  border: 2px solid #333;
  border-radius: 10px;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: background-color 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;
// ... HoleImage та MoleImage без змін ...
const HoleImage = styled.img`
  width: 80%;
  position: absolute;
  bottom: 10px; /* Трохи відступу знизу */
  z-index: 2;   /* Нора (або передня частина землі) вище по шару */
  pointer-events: none; /* Щоб клік проходив крізь картинку (опціонально) */
`;

const MoleImage = styled.img`
  width: 60%;
  position: absolute;
  bottom: 15px; /* Кріт сидить трохи вище дна, щоб виглядати "в" норі */
  z-index: 1;   /* Кріт нижче по шару, за норою */
  transition: transform 0.2s ease-in-out; /* Плавна анімація появи */
  
  /* Логіка видимості:
     Якщо visible = true, показуємо (scale 1).
     Якщо false, ховаємо вниз (translateY) або зменшуємо (scale 0).
  */
  transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(100%)'};
  opacity: ${props => props.isVisible ? 1 : 0};
`;