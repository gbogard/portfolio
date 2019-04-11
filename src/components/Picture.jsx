import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { Lightbox } from '../components/Lightbox';


const Image = styled.img`
  cursor: pointer;
  border-radius: .1rem;
  object-fit: contain;
  margin: 0 .5rem .5rem 0;
  box-shadow: -4px -5px ${theme.lightBlue} !important;
  transition: all .25s linear;
  &:hover {
    box-shadow: -8px -8px ${theme.lightBlue} !important;
    transform: scale(1.05);
  }
`

export const Picture = props => {
  const [isOpen, setIsOpen] = useState(null);
  const toggleLightbox = () => setIsOpen(!isOpen);
  
  return (
    <Fragment>
      <Image onClick={toggleLightbox} {...props} />
      { isOpen ? <Lightbox src={props.src} onClose={toggleLightbox}/> : null }
    </Fragment>
  );
};
