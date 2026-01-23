import React from 'react';
import styled from 'styled-components';
import moleImg from '../assets/mole.png';
import holeImg from '../assets/hole.png';

const MoleSlot = ({ isMoleVisible = false }) => {
    return (
        <SlotContainer>
            {/* Кріт (знаходиться "під" норою або вилазить з неї) */}
            <MoleImage
                src={moleImg}
                alt="mole"
                isVisible={isMoleVisible}
            />

            {/* Нора (статична, завжди відображається поверх крота або як фон) */}
            <HoleImage src={holeImg} alt="hole" />
        </SlotContainer>
    );
};

export default MoleSlot;

// --- STYLES ---

const SlotContainer = styled.div`
  width: 150px;
  height: 150px;
  /* position: relative потрібен, щоб ми могли абсолютно позиціонувати картинки всередині */
  position: relative; 
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Картинки будуть притиснуті до низу */
  overflow: hidden; /* Щоб кріт не вилазив за межі квадрата, якщо він завеликий */
  
  /* Стилі самої картки */
  background-color: #e0e0e0;
  border: 2px solid #333;
  border-radius: 10px;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.2);
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
`;

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