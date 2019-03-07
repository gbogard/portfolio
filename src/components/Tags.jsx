import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const Container = styled.div`
  margin: 1rem 0;
`;

const Tag = styled.span`
  background: ${theme.primaryBlue};
  color: ${theme.yellow};
  font-size: .75rem;
  margin-right: .5rem;
  padding: .33rem;
  border-radius: .2rem;
`

export const Tags = ({ tags }) => (
  <Container>
    {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
  </Container>
);
