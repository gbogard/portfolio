import React, { forwardRef } from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { Container as RawContainer } from './Container';
import { PersonalPicture } from './PersonalPicture';
import { Navbar } from './Navbar';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  background: ${theme.primaryBlue};
  padding: 3rem 0 8rem 0;
  color: white;
  opacity: ${props => (100 - props.scrollPercentage)/100};
  h1 {
    color: white;
    font-size: 2.5rem;
  }
`;

const Container = styled(RawContainer)`
  margin-top: 3rem;
`;

export const Header = forwardRef(({ children, scrollPercentage }, ref) => (
  <Wrapper ref={ref} scrollPercentage={scrollPercentage}>
    <Navbar />
    <Container>{children}</Container>
  </Wrapper>
));
