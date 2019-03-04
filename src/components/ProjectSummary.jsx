import React, { Fragment } from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { Link } from './Link';

const Wrapper = styled.div`
  margin: 2rem 0;

  i {
   margin-right: 1rem;
   color: ${theme.lightBlue};
  }

  > div {
    margin-top: .25rem;
  }
`;

const Tool = styled.img`
  height: 1rem;
  margin: 0 .5rem 0 0;
`;

export const ProjectSummary = ({ project, tools }) => {
  const startDate = project.frontmatter.startDate ? `From ${project.frontmatter.startDate}` : '';
  const endDate = project.frontmatter.endDate ? ` to ${project.frontmatter.endDate}` : '';
  const date = startDate + endDate;
  const projectTools = tools.filter(t => (project.frontmatter.tools || []).includes(t.id));

  return (
    <Wrapper>
      { projectTools && projectTools.length ? (
        <div>
          <i className="icon-hammer"/>
          {projectTools.map(t => <Tool src={t.icon} key={t.id} alt={t.name} />)}
        </div>
      ) : null }
      { date ? (
        <div>
          <i className="icon-calendar"/> {date}
        </div>
      ) : null }
    { project.frontmatter.employer || project.frontmatter.client ? (
      <div>
        <i className="icon-briefcase" />
        {
          project.frontmatter.employer
            ? <Link href={project.frontmatter.employer.link}>{project.frontmatter.employer.name}</Link>
          : null
        }
        {
          project.frontmatter.client
            ? <Fragment> for <Link href={project.frontmatter.client.link}>{project.frontmatter.client.name}</Link></Fragment>
          : null
        }
      </div>
    ) : null }
    </Wrapper>
  );
};
