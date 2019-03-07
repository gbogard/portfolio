import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import theme from '../config/theme';
import { Navbar } from '../components/Navbar';

const Page = styled.div` 
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: ${theme.primaryBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  font-family: Menlo, monospace;
`;

const StyledLink = styled(Link)`
  color: ${theme.primaryBlue};
  background: ${theme.yellow};
  padding: 0 .5rem;
`;

const NavWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 0;
  width: 100vw;
`;

const Shrug = styled.div`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

export default () => (
  <Page>
    <NavWrapper>
      <Navbar />
    </NavWrapper>
    <Shrug>
      ¯\_(ツ)_/¯
    </Shrug>
    <p>
      Looks like what you're looking for is not here.
    </p>
    <StyledLink to="/">
      Take me home
    </StyledLink>
  </Page>
)
