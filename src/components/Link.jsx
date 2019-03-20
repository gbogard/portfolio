import React from 'react';
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import theme from '../config/theme';

const commonStyle = `
  color: ${theme.primaryBlue};
  background-image: none;
  text-shadow: none;
  text-decoration: none;
  padding: .1rem;
  position: relative;
  overflow: hidden;
  height: auto;
  font-height: 1rem;
  
  &:after {
    content: ' ';
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: .2rem;
    background: ${theme.yellow};
    z-index: -1;
    transition: height .25s linear;
  }

  &:hover {
    &:after {
      height: 1.5rem;
    }
  }
`;

const StyledGatsbyLink = styled(GatsbyLink)`${commonStyle}`;
const StyledLink = styled.a`${commonStyle}`;

export const Link = ({ href, ...props }) => {
  if (!href || href.startsWith('http')) {
    return <StyledLink href={href} {...props} />;
  }
  return <StyledGatsbyLink to={href} {...props} />;
};
