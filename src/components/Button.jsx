import { Link } from 'gatsby';
import styled from 'styled-components';
import theme from '../config/theme';

export const ButtonLink = styled(Link)`
  font-family: 'Menlo', 'Courier', monospace;
  display: inline-block;
  background: ${theme.primaryBlue};
  color: ${theme.yellow} !important;
  text-shadow: none;
  border: solid 3px ${theme.yellow};
  padding: 10px 20px;
  font-weight: bold;
  position: relative;
  z-index: auto;
  &:before {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid: ${theme.yellow};
    background-color: ${theme.yellow};
    left: -8px;
    top: -8px;
    content: '';
  }
`;
