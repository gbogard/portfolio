import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { graphql } from 'gatsby';
import { ButtonLink } from '../components/Button';
import { PersonalPicture } from '../components/PersonalPicture';
import { Layout } from '../components/Layout';
import { Html } from '../components/Html';
import { ProjectsList } from '../components/ProjectsList';
import { ToolIcon } from '../components/ToolIcon';
import { SmallTitle } from '../components/SmallTitle';

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

export default ({
  data: {
    intro: {
      edges: [
        {
          node: {
            html: introduction
          }
        }
      ]
    },
    projects,
    tools: rawTools
  }
}) => {
  const [activeTools, setActiveTools] = useState([]);;
  const onToolClick = toolId => () => {
    if(activeTools.includes(toolId)) {
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
             <Html>{introduction}</Html>
          </Intro>
        </Content>
        <ButtonLink>
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
      <SmallTitle>Tools</SmallTitle>
      {toolsList}
      <SmallTitle>Projects</SmallTitle>
      <ProjectsList projects={filteredProjects} tools={tools} />
    </Layout>
  )
}

export const query = graphql`
  query {
    intro: allMarkdownRemark(filter: { frontmatter: { title: {eq: "Introduction"} } }) {
      edges {
        node {
          id
          html,
        }
      }
    },
    projects: allMarkdownRemark(filter: { frontmatter: {type: {eq: "Project"}} },  sort: {fields: [frontmatter___startDate], order: DESC}) {
      edges {
        node {
          ...ProjectData
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
