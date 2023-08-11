import { css } from '@emotion/react';
import { cssProps } from '../components/atom/Button';

export default (props: cssProps) => css`
  display: flex;
  justify-content: ${props.icon ? 'space-between' : 'center'};
  align-items: center;
  min-width: ${props.minWidth || '96px'};
  padding: ${props.padding || '10px'};
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props.borderColor || props.bgColor};
  font-size: ${props.fontSize || undefined};
  font-weight: ${props.fontWeight || 'bold'};
  color: ${props.color};
  background-color: ${props.bgColor};
`;
