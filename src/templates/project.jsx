import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout } from '../components/Layout';
import { Html } from '../components/Html';
import { ProjectSummary } from '../components/ProjectSummary';
import { SmallTitle } from '../components/SmallTitle';
import { PrevNext } from '../components/PrevNext';

const Small = styled.small`
  display: block;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

export default ({ data: { project, tools }, pageContext }) => {
  const header = (
    <h1>
      <Small>Project</Small>
      {project.frontmatter.title}
    </h1>
  );

  const prev = pageContext.prev && { title: pageContext.prev.frontmatter.title, link: pageContext.prev.fields.slug };
  const next = pageContext.next && { title: pageContext.next.frontmatter.title, link: pageContext.next.fields.slug };
  return (
    <Layout header={header}>
      <SmallTitle>Project Summary</SmallTitle>
      <ProjectSummary project={project} tools={tools.edges.map(t => t.node)} />
      <br />
      <Html>{project.html}</Html>
      <PrevNext prev={prev} next={next} />
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        employer {
          name
        link
        }
        client {
          name
          link
        }
        startDate(formatString: "MMMM YYYY")
        endDate(formatString: "MMMM YYYY")
        images {
            childImageSharp {
              fluid(maxWidth: 1200) {
                src
                srcSet
              }
            },
          },
        tools
      }
      fields {
        slug
      }
      html
    },
    tools: allToolsYaml {
      edges {
        node {
          id,
          name,
          icon {
            childImageSharp {
              fluid(maxWidth: 200) {
                src
                srcSet
              }
            },
          },
        }
      }
    }
  }
`;
