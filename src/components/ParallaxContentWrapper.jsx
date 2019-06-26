import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { Container } from './Container';

const maxShadowOpacity = .25;
const maxTopOffset = 75;
const shadowOpacity = percentage => (100 - percentage)*maxShadowOpacity/100;
const top = percentage => Math.min(percentage/1.5, maxTopOffset);

const ContentWrapper = styled(Container)`
  z-index: 10;
  background: white;
  border-radius: .1rem;
  position: relative;
  top: -4rem;
  box-shadow: 0 -3px 8px rgba(0,0,0,${props => shadowOpacity(props.scrollPercentage)});
  transform: translateY(-${props => top(props.scrollPercentage)}px);
  margin-bottom: 2rem;

  @media(min-width: ${theme.breakPoints.desktop}) {
    padding-top: 2rem 0 0 0;
    box-sizing: border-box;
    border-left: solid 2rem white;
    border-right: solid 2rem white;
    box-sizing: content-box;
  }
`;

export const ParallaxContentWrapper = ({ children, scrollPercentage }) =>  (
  <ContentWrapper scrollPercentage={scrollPercentage}>
    {children}
  </ContentWrapper>
);
