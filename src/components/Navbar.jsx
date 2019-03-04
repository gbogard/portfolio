import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Container } from './Container';
import theme from '../config/theme';
import { useWindowScroll } from '../hooks/windowScroll';

const height = 70;
const scrollOffset = 600;

const FixedWrapper = styled.div`
  background: ${theme.primaryBlue};
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${height}px;
  transform: translateY(${props => props.active ? '0px' : `-${height}px`});
  box-shadow: 0 2px 4px rgba(0,0,0,.15);
  transition: transform .25s linear;
`;

const Content = styled(Container)`
  height: ${height}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: Menlo, monospace;
  font-size: 1rem;

  a {
    color: white;
    text-shadow: none;
    text-decoration: none;
    background: none;
  }
`;

export const Navbar = ({ children }) => {
  const { y } = useWindowScroll();

  const content = (
    <Content>
      <Link to="/">
        guillaumebogard
      </Link>
      <div>
        <Link to="/blog">
          blog
        </Link>
      </div>
    </Content>
  );
  
  return (
    <Fragment>
      {content}
      {createPortal(
        <FixedWrapper active={y >= scrollOffset}>
          {content}
        </FixedWrapper>,
        window.document.body
      )}
    </Fragment>
  )
}; 
