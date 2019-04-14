import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { Layout } from '../components/Layout';
import { Seo } from '../components/Seo';
import theme from '../config/theme';
import { Tags } from '../components/Tags';

const Arrow = styled.div`
  width: 40px;
  text-align: right;
  @media(min-width: ${theme.breakPoints.desktop}) {
    width: 100px;
  }
`;

const Item = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
  h2 {
    color: black;
  }

  &:hover {
    ${Arrow} {
      color: ${theme.primaryBlue};
    }
  }
`

const Content = styled.div`
  flex: 1;
`;

export default (
  {
    data: {
      posts: { edges: posts }
    }
  }
) => {
  const header = (
    <div>
      <h1>Blog</h1>
      <p>Mainly thoughts on how to build better software.</p>
    </div>
  )

  const content = posts.map(({
    node: { id,
            frontmatter,
            excerpt,
            timeToRead,
            fields: { slug }
          }
  }) => (
    <Item to={slug} key={id}>
      <Content>
        <h2>{frontmatter.title}</h2>
        <i className="icon-calendar"/> {frontmatter.date}
        {'  |  '}
        <i className="icon-clock" /> {Math.round(timeToRead * 1.2)} minutes read
        <Tags tags={frontmatter.tags || []} />
        <p>{excerpt}</p>
      </Content>
      <Arrow>
        <i className="icon-chevron-right" />
      </Arrow>
    </Item>
  ))
  
  return (
    <Layout header={header}>
      <Seo title="Blog" />
      {content}
    </Layout>
  )
}


export const query = graphql`
{
  posts: allMarkdownRemark(
    filter: {frontmatter: {type: {eq: "Post"}, published: {ne: false}}}, 
    sort: {fields: [frontmatter___date], order: DESC}
  ) {
    edges {
      node {
        ...PostData
      }
    }
  }
}`;
