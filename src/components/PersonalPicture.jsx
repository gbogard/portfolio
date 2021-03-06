import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import theme from '../config/theme';

const ratio = 1.33;

const Wrapper = styled.div`
  width: 200px;
  height: ${200*ratio}px;
  margin-left: 3rem;
  display: none;
  position: relative;
  margin-top: 40px;

  @media(min-width: ${theme.breakPoints.tablet}) {
    display: block;
  }
`

const Dots = styled.div`
  height: 100%;
  width: 100%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQoU2P8////fwYGBgZGRkZGEI0LMBKtEJ8pyHJ4rRtVCAAi3QgLki9aDgAAAABJRU5ErkJggg==);
  position: relative;
  top: -40px;
  left: -40px;
`;

const Img = styled.img`
  width: 100%;
  heigth: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const query = graphql`
query {
  file(relativePath: {eq: "assets/images/picture.jpg"}) {
    childImageSharp {
      fluid(maxWidth: 200) {
        src,
        srcSet,
      }
    }
  }
}
`;

export const PersonalPicture = () => (
  <StaticQuery query={query} render={
    ({ file: { childImageSharp: { fluid } } }) =>  (
      <Wrapper>
        <Dots />
        <Img {...fluid} />
      </Wrapper>
    )
  }/>
)
