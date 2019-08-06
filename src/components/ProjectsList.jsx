import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { ProjectSummary } from './ProjectSummary'; 
import { Link } from './Link';
import { PicturesList } from './PicturesList';

const Grid = styled.div`
  margin-bottom: 4rem;
  @media(min-width: ${theme.breakPoints.tablet}) {
    display: grid;
    grid-template-columns: 1fr 390px;
    grid-column-gap: 3rem;
  }
`;

export const getImages = project =>
  (project.frontmatter.images || [])
  .map(image => {
    if(image.childImageSharp) {
      return image.childImageSharp.fluid;
    }
    return { src: image.publicURL }
  });

const renderProject = tools => (project) => {
  return (
    <div key={project.id}>
      <h2>{project.frontmatter.title}</h2>
      <Grid>
        <div>
          <ProjectSummary project={project} tools={tools} />
          {project.excerpt}
          <Link href={project.fields.slug}>Learn more{' >'}</Link>
        </div>
        <PicturesList pictures={getImages(project)} />
      </Grid>
    </div>
  );
};

export const ProjectsList = ({ projects, tools }) => projects.map(renderProject(tools));
