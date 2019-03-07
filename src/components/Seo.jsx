import React from 'react';
import Helmet from 'react-helmet';

export const Seo = ({
  title,
  description,
}) => {
  const blogName = 'Guillaume Bogard'
  const fullTitle = title ? `${title} - ${blogName}` : blogName;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      { description && <meta name="description" content={description} /> }
    </Helmet>
  )
}
