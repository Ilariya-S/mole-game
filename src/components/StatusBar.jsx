import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const StatusBar = () => {
  const { difficulty, score, misses, timeLeft } = useSelector((state) => state.game);

  return (
    <StatusContainer>
      <Title>STATUS BAR</Title>
      <InfoItem>Game difficulty: {difficulty}</InfoItem>
      <InfoItem>Score: {score} / 100 point(s)</InfoItem>
      <InfoItem>You failed: {misses} time(s)</InfoItem>
      <InfoItem>Time: {timeLeft} ms</InfoItem>
    </StatusContainer>
  );
};
export default StatusBar;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  height: 350px;
  padding: 20px;
  font-family: sans-serif;
  background-color: #f8c8dc;
  border: 2px solid #333;
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const InfoItem = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 5px 0;
`;