import { css } from '@emotion/react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { visuallyHidden } from '../../styles';

const togglerCss = {
  button: css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    letter-spacing: -0.32px;
  `,
  toggle: ({ selected }: { selected: boolean }) => css`
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 50px;
    background-color: ${selected ? 'var(--orange)' : 'var(--gray)'};

    &:before {
      position: absolute;
      content: '';
      top: 50%;
      width: 15px;
      height: 15px;
      left: ${selected ? 'calc(95% - 15px)' : '5%'};
      border-radius: 50px;
      transform: translateY(-50%);
      transition: all 0.5s ease;
      background-color: var(--white);
    }
  `,
  label: css`
    font-size: 14px;
    letter-spacing: -0.32px;
  `,
};

interface FormTogglerProps {
  selected: boolean;
  text: string;
  register?: UseFormRegisterReturn;
}

const FormToggler = ({ selected, text, register }: FormTogglerProps) => {
  return (
    <label css={togglerCss.button}>
      <div css={togglerCss.toggle({ selected })} />
      <input css={visuallyHidden} type="checkbox" {...register} />
      {text}
    </label>
  );
};

export default FormToggler;
