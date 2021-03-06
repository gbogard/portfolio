import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import { Lightbox } from '../components/Lightbox';

const Wrapper = styled.div`
  box-sizing: border-box;
  overflow: auto;
  padding: .75rem;
`

const Image = styled.img`
  float: left;
  cursor: pointer;
  border-radius: .1rem;
  max-width: 160px;
  margin: 0 .75rem .75rem 0;
  box-shadow: -4px -5px ${theme.lightBlue};
  transition: all .25s linear;
  &:hover {
    box-shadow: -8px -8px ${theme.lightBlue};
    transform: scale(1.05);
  }
`

export const PicturesList = ({ pictures }) => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const handleClick = picture => () => setSelectedPicture(picture);
  return (
    <Fragment>
      <Wrapper>
        {pictures.map(props => (
          <Image key={props.src} {...props} onClick={handleClick(props)} />
        ))}
      </Wrapper>
      { selectedPicture ? <Lightbox {...selectedPicture} onClose={handleClick(null)}/> : null }
    </Fragment>
  );
};
