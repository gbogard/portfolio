import styled from 'styled-components';
import theme from '../config/theme';


export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 1rem;
  @media(min-width: ${theme.breakPoints.desktop}) {
    width: calc(100vw - 1rem);
    padding: 1rem 0;
  }
`;
