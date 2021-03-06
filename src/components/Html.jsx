import React from 'react';
import parse from 'html-react-parser';
import { Link } from './Link';
import { CenteredPicture } from './Picture';

const mapChildren = child => {
  if (!React.isValidElement(child)) return child;
  const children = React.Children.map(child.props.children, mapChildren);

  if(child.type === 'a') {
    return <Link {...child.props} />
  }

  if (child.type === 'img') {
    return <CenteredPicture {...child.props} />
  }
  
  return React.cloneElement(child, {}, children);
};

export const Html = ({ children }) => React.Children.map(parse(children), mapChildren);
