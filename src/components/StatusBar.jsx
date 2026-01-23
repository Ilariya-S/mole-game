import React from 'react';
import styled from 'styled-components';

const StatusBar = () => {
    return (
        <StatusContainer>
            <Title>STATUS BAR</Title>
            <InfoItem>Game difficulty: 1</InfoItem>
            <InfoItem>Score: 0 / 100 point(s)</InfoItem>
            <InfoItem>You failed: 0 time(s)</InfoItem>
            <InfoItem>Time: 200 ms</InfoItem>
        </StatusContainer>
    );
};

export default StatusBar;

// --- STYLES ---
const StatusContainer = styled.div`
  width: 300px;
  height: 400px;
  background-color: #f8c8dc; /* Рожевий колір */
  border: 2px solid #333;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: sans-serif;
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