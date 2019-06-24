import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const Content = styled.div`
  background: ${theme.footerBackground};
  width: 100vw !important;
  padding: 4rem 1rem;
  box-sizing: border-box;
  text-align: center;

  >div {
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.5rem;
    img {
      height: .7rem;
      display: inline;
    }
  }
`;

const Icon = styled.a`
  margin: .5rem;
  cursor: pointer;
  font-size: 2rem;
`;

const License = styled.div`
  font-size: .75rem;
  color: #808e9b;

  a {
    color: ${theme.primaryBlue};
  }
`;

export const Footer = () => (
  <Content>
    <div>
      <Icon href="https://github.com/gbogard/portfolio">
        <i className="icon-github" />
      </Icon>
      <Icon href="https://www.linkedin.com/in/guillaume-bogard/">
        <i className="icon-linkedin2" />
      </Icon>
    </div>
    <License>
      <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
        <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />
      </a>
      <p>
        The content of this website is shared under
        a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a> unless
        otherwise mentioned.
      </p>
      <p>
        This website uses <a href="https://usefathom.com/">Fathom Analytics</a>, an open-source statistics plarform that respects your privacy.
      </p>
      <p>
        Made with ❤ and <a href="https://www.gatsbyjs.org"><img alt="Gatsby" src="https://www.gatsbyjs.org/favicon.ico"/></a>. Hosted
        on <a href="https://www.netlify.com/">Netlify</a>.
      </p>
    </License>
  </Content>
) 
