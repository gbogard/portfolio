import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-mdx';
import theme from '../config/theme';
import { graphql } from 'gatsby';
import { ButtonLink } from '../components/Button';
import { PersonalPicture } from '../components/PersonalPicture';
import { Layout } from '../components/Layout';
import { ProjectsList } from '../components/ProjectsList';
import { ToolIcon } from '../components/ToolIcon';
import { SmallTitle } from '../components/SmallTitle';
import { Seo } from '../components/Seo';
import { ParallaxContentWrapper } from '../components/ParallaxContentWrapper';

const Content = styled.div`
  a {
   color: white;
   background: none;
   transition: all .25s linear;

   &:hover {
     color: ${theme.primaryBlue};
    }
  }
`;

const Container = styled.div`
 display: flex;
  ${ButtonLink} {
    margin-top: 1rem
  }
`;

const Intro = styled.div`
  display: none;
  @media(min-width: ${theme.breakPoints.tablet}) {
    display: block;
  }
`;

const BlogPostsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media(min-width: ${theme.breakPoints.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export default ({
  data: {
    intro: {
      edges: [
        {
          node: {
            code: introduction
          }
        }
      ]
    },
    projects,
    posts,
    tools: rawTools
  }
}) => {
  const [activeTools, setActiveTools] = useState([]);;
  const onToolClick = toolId => () => {
    if (activeTools.includes(toolId)) {
      setActiveTools(activeTools.filter(i => i !== toolId));
    } else {
      setActiveTools([...activeTools, toolId]);
    }
  };

  const filteredProjects =
    projects.edges
      .map(p => p.node)
      .filter(project => {
        if (!activeTools.length) {
          return true;
        }
        return (project.frontmatter.tools || []).some(tool => activeTools.includes(tool));
      });

  const tools = rawTools.edges.map(t => t.node);
  const toolsList = tools.map(({ id, icon: { childImageSharp: { fluid } }, name }) => (
    <ToolIcon
      onClick={onToolClick(id)}
      active={activeTools.includes(id)}
      key={id}
      alt={name}
      {...fluid}
    />
  ));

  const header = (
    <Container>
      <div>
        <Content>
          <h1>
            Hi there!<br />
            My name is Guillaume
          </h1>
          <Intro>
            <MDXRenderer scope={introduction.scope}>{introduction.body}</MDXRenderer>
          </Intro>
        </Content>
        <ButtonLink to="/about">
          Get to know me
        </ButtonLink>
      </div>
      <div>
        <PersonalPicture />
      </div>
    </Container>
  );

  return (
    <Layout header={header}>
      {scrollPercentage => (
        <Fragment>
          <Seo title="Portfolio" />
          <ParallaxContentWrapper scrollPercentage={scrollPercentage}>
            <SmallTitle>Latest from my blog</SmallTitle>
            <BlogPostsContainer>
              {posts.edges.map(({ node: post }) => (
                <div>
                  <h5>
                    {post.frontmatter.title}
                  </h5>
                  <p>
                    {post.excerpt}
                  </p>
                </div>
              ))}
            </BlogPostsContainer>
          </ParallaxContentWrapper>
          <ParallaxContentWrapper scrollPercentage={scrollPercentage}>
            <SmallTitle>Tools</SmallTitle>
            {toolsList}
            <SmallTitle>Projects</SmallTitle>
            <ProjectsList projects={filteredProjects} tools={tools} />
          </ParallaxContentWrapper>
        </Fragment>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    intro: allMdx(filter: { frontmatter: { title: {eq: "Introduction"} } }) {
      edges {
        node {
          id
          code {
            body,
            scope
          },
        }
      }
    },
    projects: allMdx(filter: { frontmatter: {type: {eq: "Project"}} },  sort: {fields: [frontmatter___startDate], order: DESC}) {
      edges {
        node {
          ...ProjectData
        }
      }
    },
    posts: allMdx(
      filter: {frontmatter: {type: {eq: "Post"}, published: {ne: false}}}, 
      sort: {fields: [frontmatter___date], order: DESC},
      limit: 3
    ) {
      edges {
        node {
          ...PostData
        }
      }
    },
    tools: allToolsYaml {
      edges {
        node {
          ...ToolData
        }
      }
    }
  }
`;
