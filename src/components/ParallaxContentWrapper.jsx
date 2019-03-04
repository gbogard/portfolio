import React from 'react';
import styled from 'styled-components';
import { Container } from './Container';

const maxShadowOpacity = .25;
const maxTopOffset = 50;
const shadowOpacity = percentage => (100 - percentage)*maxShadowOpacity/100;
const top = percentage => percentage*maxTopOffset/100;

const ContentWrapper = styled(Container)`
  z-index: 10;
  background: white;
  border-radius: .1rem;
  position: relative;
  top: -4rem;
  padding: 1rem 0;
  border-left: solid 2rem white;
  border-right: solid 2rem white;
  box-sizing: content-box;
  box-shadow: 0 -3px 8px rgba(0,0,0,${props => shadowOpacity(props.scrollPercentage)});
  transform: translateY(-${props => top(props.scrollPercentage)}px);
  min-height: 90vh;
`;

export const ParallaxContentWrapper = ({ children, scrollPercentage }) =>  (
  <ContentWrapper scrollPercentage={scrollPercentage}>
    <Container>{children}</Container>
  </ContentWrapper>
);
