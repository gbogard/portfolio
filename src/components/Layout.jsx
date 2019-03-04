import React, { PureComponent, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { lighten } from 'polished';
import theme from '../config/theme';
import { useWindowScroll } from '../hooks/windowScroll';
import { Header } from '../components/Header';
import { ParallaxContentWrapper } from './ParallaxContentWrapper';

const heroHeight = 300;

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.base};
  }
`;

const MainContentWrapper = styled.div`
  background: ${props => lighten(props.scrollPercentage / 2000, theme.background)};
`;

export const Layout = ({ header, children }) => {
  const ref = useRef({ scrollHeight: 1000 });
  const { y } = useWindowScroll();
  const { current: { scrollHeight } } = ref;
  const topOffset = 60;
  const bottomOffset = 200;
  const scrollPercentage = (y-topOffset)*100/(scrollHeight - bottomOffset);

  
  return  (
    <MainContentWrapper scrollPercentage={scrollPercentage}>
      <GlobalStyle />
      <Header ref={ref} scrollPercentage={scrollPercentage}>{header}</Header>
      <ParallaxContentWrapper scrollPercentage={scrollPercentage}>
        {children}
      </ParallaxContentWrapper>
    </MainContentWrapper>
  );
};
