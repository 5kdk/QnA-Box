import { css } from '@emotion/react';
import { cssProps } from '../components/atom/Button';

export const buttonCss = (props: cssProps) => css`
  display: flex;
  justify-content: ${props.icon ? 'space-between' : 'center'};
  align-items: center;
  min-width: ${props.minWidth || '96px'};
  padding: ${props.padding || '10px'};
  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props.borderColor || props.bgColor};
  font-weight: ${props.fontWeight || 'bold'};
  color: ${props.color};
  background-color: ${props.bgColor};
`;
