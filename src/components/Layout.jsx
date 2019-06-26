import React, { useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import { lighten } from 'polished';
import theme from '../config/theme';
import { Header } from '../components/Header';
import { Link } from '../components/Link';
import { ParallaxContentWrapper } from './ParallaxContentWrapper';
import { Seo } from './Seo';
import { Footer } from './Footer';
import { Code } from './Code';
import { useScrollPercentage } from '../hooks/scrollPercentage';

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
  const scrollPercentage = useScrollPercentage(ref);
  const mdxComponents = {
    a: Link,
    code: Code,
  }

  return (
    <MDXProvider components={mdxComponents}>
      <MainContentWrapper scrollPercentage={scrollPercentage}>
        <Seo />
        <GlobalStyle />
        <Header ref={ref} scrollPercentage={scrollPercentage}>{header}</Header>
        {children(scrollPercentage)} 
        <Footer />
      </MainContentWrapper>
    </MDXProvider>
  );
};
