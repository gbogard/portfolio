import React from 'react';
import styled from 'styled-components';
import { Link } from './Link';
import theme from '../config/theme';

const Wrapper = styled.div`
  margin-top: 1rem;
  box-sizing: border-box;
  >div {
    margin-top: 2rem;
  }
  @media(min-width: ${theme.breakPoints.tablet}) {
    display: flex;
    justify-content: space-between;
  }
`

export const PrevNext = ({ prev, next }) => (
  <Wrapper>
    <div>
      { prev && <Link href={prev.link}>{'< '}{prev.title}</Link>}
    </div>
    <div>
      { next && <Link href={next.link}>{next.title}{' >'}</Link>}
    </div>
  </Wrapper>
)
