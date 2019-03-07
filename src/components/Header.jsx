import React, { forwardRef } from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { Container } from './Container';
import { Navbar } from './Navbar';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  background: ${theme.primaryBlue};

  color: white;
  opacity: ${props => (100 - props.scrollPercentage)/100};
  h1 {
    color: white;
    font-size: 2.5rem;
  }
  text-align: center;
  padding: 1rem 0 4rem 0;
  @media(min-width: ${theme.breakPoints.tablet}) {
    text-align: left;
  }

  @media(min-width: ${theme.breakPoints.desktop}) {
    padding: 3rem 0 8rem 0;
  }
`;

export const Header = forwardRef(({ children, scrollPercentage }, ref) => (
  <Wrapper ref={ref} scrollPercentage={scrollPercentage}>
    <Navbar />
    <Container>{children}</Container>
  </Wrapper>
));
