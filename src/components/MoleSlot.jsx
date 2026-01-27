import React from 'react';
import styled from 'styled-components';
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

const SlotContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  width: 150px;
  height: 150px;
  
  /* Change background depending on status */
  background-color: ${props =>
    props.status === 'hit' ? '#90EE90' : 
      props.status === 'miss' ? '#FF7F7F' : 
        '#e0e0e0'
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
const HoleImage = styled.img`
  z-index: 2;
  position: absolute;
  width: 80%;
  bottom: 10px;
  pointer-events: none;
`;

const MoleImage = styled.img`
  position: absolute;
  z-index: 1; 
  width: 80%;
  bottom: 10px;
  transition: transform 0.2s ease-in-out;
  opacity: ${props => props.isVisible ? 1 : 0};
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
  transition: opacity 0.2s ease-in-out;
`;