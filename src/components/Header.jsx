import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return <MainTitle>GENOCIDE OF MOLES</MainTitle>;
};

export default Header;

const MainTitle = styled.h1`
  font-family: sans-serif;
  font-size: 48px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 40px;
  font-weight: bold;
`;