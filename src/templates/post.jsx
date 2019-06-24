import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-mdx';
import { Layout } from '../components/Layout';
import { PrevNext } from '../components/PrevNext';
import { Seo } from '../components/Seo';

const Small = styled.small`
  display: block;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

export default ({ data: { post }, pageContext }) => {
  const header = (
    <h1>
      <Small>Blog post</Small>
      {post.frontmatter.title}
    </h1>
  );

  const prev = pageContext.prev && { title: pageContext.prev.frontmatter.title, link: pageContext.prev.fields.slug };
  const next = pageContext.next && { title: pageContext.next.frontmatter.title, link: pageContext.next.fields.slug };
  return (
    <Layout header={header}>
      <Seo
        title={post.frontmatter.title}
        description={post.excerpt}
      />
      <MDXRenderer scope={post.code.scope}>{post.code.body}</MDXRenderer>
      <PrevNext prev={prev} next={next} />
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    post: mdx(fields: { slug: { eq: $slug } }) {
      ...PostData
    },
  }
`;
