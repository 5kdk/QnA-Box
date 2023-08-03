import { forwardRef } from 'react';
import { css } from '@emotion/react';

const flexStyle = ({ flexDirection, justifyContent, alignItems, alignContent, flexWrap }: FlexProps) => css`
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  align-content: ${alignContent};
  flex-wrap: ${flexWrap};
`;

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  alignContent?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ flexDirection, justifyContent, alignItems, alignContent, flexWrap, children, ...rest }, ref) => {
    return (
      <div ref={ref} css={flexStyle({ flexDirection, justifyContent, alignItems, alignContent, flexWrap })} {...rest}>
        {children}
      </div>
    );
  },
);

export default Flex;
