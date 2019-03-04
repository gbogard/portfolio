import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { Layout } from '../components/Layout';
import { Html } from '../components/Html';
import { ProjectsList } from '../components/ProjectsList';
import { ToolIcon } from '../components/ToolIcon';
import { ParallaxContentWrapper } from '../components/ParallaxContentWrapper';
import { SmallTitle } from '../components/SmallTitle';
import theme from '../config/theme';

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
            html,
            frontmatter,
            excerpt,
            fields: { slug }
          }
  }) => (
    <Link to={slug}>
      <div>
        <h2>{frontmatter.title}</h2>
        <p>{excerpt}</p>
        <i className="icon-calendar"/> {frontmatter.date}
      </div>
    </Link>
  ))
  
  return (
    <Layout header={header}>
      {content}
    </Layout>
  )
}


export const query = graphql`
{
  posts: allMarkdownRemark(
    filter: {frontmatter: {type: {eq: "Post"}}}, 
    sort: {fields: [frontmatter___date], order: DESC}
  ) {
    edges {
      node {
        id,
        html,
        excerpt,
        fields { slug },
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY")
          tags,
        }
      }
    }
  }
}
`;
