import styled from 'styled-components';

const notActiveStyle =  `
  filter: grayscale(100%) contrast(90%) brightness(110%);
`

export const ToolIcon = styled.img`
  cursor: pointer;
  height: ${props => props.sm ? '25px' : '50px'};
  margin: .5rem 1rem 0 0;
  ${props => !props.active ? notActiveStyle : ''}
`;
