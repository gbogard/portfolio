import React from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,.8);
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 75vw;
  max-height: 75vh;
  border-radius: .25rem;
`;


export const Lightbox = ({ src, onClose }) => (
  <Portal>
    <Overlay onClick={onClose}>
      <Image src={src} />
    </Overlay>
  </Portal>
);
