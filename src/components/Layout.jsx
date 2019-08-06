import React, { useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { lighten } from 'polished';
import theme from '../config/theme';
import { useWindowScroll } from '../hooks/windowScroll';
import { Header } from '../components/Header';
import { Link } from '../components/Link';
import { ParallaxContentWrapper } from './ParallaxContentWrapper';
import { Seo } from './Seo';
import { Footer } from './Footer';
import { Code } from './Code';

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
  const scrollPercentage = (y - topOffset) * 100 / (scrollHeight - bottomOffset);


  return (
    <MDXProvider
      components={{
        a: Link,
        code: Code,
      }} 
    >
      <MainContentWrapper scrollPercentage={scrollPercentage}>
        <Seo />
        <GlobalStyle />
        <Header ref={ref} scrollPercentage={scrollPercentage}>{header}</Header>
        <ParallaxContentWrapper scrollPercentage={scrollPercentage}>
          {children}
        </ParallaxContentWrapper>
        <Footer />
      </MainContentWrapper>
    </MDXProvider>
  );
};
