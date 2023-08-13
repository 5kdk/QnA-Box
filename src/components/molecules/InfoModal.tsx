import { css } from '@emotion/react';
import { Flex, Button } from '../atom';
import { modalCss } from '../../styles';
import { useAtomValue } from 'jotai';
import { globalWidthState } from '../../jotai/atom';

const infoModalCss = {
  infoBox: (globalWidth: string) => css`
    width: ${globalWidth};
    padding: 48px 24px;
    gap: 32px;
    background-color: var(--white);
  `,
  text: css`
    gap: 8px;
    > p {
      font-size: 14px;
    }
  `,
  buttons: css`
    align-self: flex-end;
    gap: 11.2px;
  `,
};

interface BtnProps {
  text: string;
  onClick: () => void;
}
interface ModalProps {
  title: string;
  text?: string;
  normalBtn: BtnProps;
  importantBtn: BtnProps;
}

const InfoModal = ({ title, text, normalBtn, importantBtn }: ModalProps) => {
  const globalWidth = useAtomValue(globalWidthState);

  return (
    <Flex css={modalCss} justifyContent="center" alignItems="center" onClick={importantBtn.onClick}>
      <Flex
        css={infoModalCss.infoBox(globalWidth)}
        flexDirection="column"
        alignContent="center"
        onClick={e => e.stopPropagation()}>
        <Flex css={infoModalCss.text} flexDirection="column">
          <h3>{title}</h3>
          {text && <p>{text}</p>}
        </Flex>
        <Flex css={infoModalCss.buttons}>
          <Button
            text={normalBtn.text}
            color="var(--black)"
            bgColor="var(--white)"
            borderColor="var(--gray)"
            onClick={normalBtn.onClick}
          />
          <Button text={importantBtn.text} color="var(--white)" bgColor="var(--black)" onClick={importantBtn.onClick} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InfoModal;
