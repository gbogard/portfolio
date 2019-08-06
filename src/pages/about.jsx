import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import { Layout } from '../components/Layout';

export const query = graphql`
  query {
     allMdx(filter: { frontmatter: { title: { eq: "Biography" } }}) {
      totalCount
      edges {
        node {
          id
          code {
            body,
            scope
          },
        }
      }
    }
  }
`

export default ({
  data: {
    allMdx: {
      edges: [
        {
          node: { code }
        }
      ]
    }
  }
}) => {
  const header = (
    <h1>About me</h1>
  )
  return (
    <Layout header={header}>
      <MDXRenderer scope={code.scope}>{code.body}</MDXRenderer>
    </Layout>
  )
}
