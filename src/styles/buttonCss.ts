import { css } from '@emotion/react';
import { cssProps } from '../components/atom/Button';

export const buttonCss = (props: cssProps) =>
  css({
    display: 'flex',
    justifyContent: props.icon ? 'space-between' : 'center',
    alignItems: 'center',
    minWidth: props.minWidth || '6rem',
    padding: props.padding || '10px',
    fontWeight: props.fontWeight || 'bold',
    color: props.color,
    backgroundColor: props.bgColor,
    borderRadius: '10px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: props.borderColor || props.bgColor,
  });
