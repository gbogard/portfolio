import React from 'react';
import { graphal } from 'gatsby';
import { Layout } from '../components/Layout';
import { Html } from '../components/Html';

export const query = graphql`
  query {
     allMarkdownRemark(filter: { frontmatter: { title: { eq: "Biography" } }}) {
      totalCount
      edges {
        node {
          id
          html,
        }
      }
    }
  }
`

export default ({
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: { html }
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
      <Html>{html}</Html>
    </Layout>
  )
}
