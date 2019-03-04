import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { ProjectSummary } from './ProjectSummary'; 
import { Link } from './Link';
import { Html } from './Html';
import { PicturesList } from './PicturesList';

const Grid = styled.div`
  margin-bottom: 4rem;
  @media(min-width: ${theme.breakPoints.tablet}) {
    display: grid;
    grid-template-columns: 1fr 360px;
    grid-column-gap: 3rem;
  }
`;

const renderProject = tools => (project) => (
  <div key={project.id}>
    <h2>{project.frontmatter.title}</h2>
    <Grid>
      <div>
        <ProjectSummary project={project} tools={tools} />
        <Html>{project.html.substr(0, 250) + '...'}</Html>
        <Link href={project.fields.slug}>Learn more{' >'}</Link>
      </div>
      <PicturesList pictures={project.frontmatter.images || []}/>
    </Grid>
  </div>
);

export const ProjectsList = ({ projects, tools }) => projects.map(renderProject(tools));
