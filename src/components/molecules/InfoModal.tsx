import { css } from '@emotion/react';
import { Flex, Button } from '../atom';

const modalCss = {
  modal: css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 100vh;
    background-color: var(--modal);
  `,
  infoBox: css`
    width: 448px;
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
  return (
    <Flex css={modalCss.modal} justifyContent="center" alignItems="center" onClick={importantBtn.onClick}>
      <Flex css={modalCss.infoBox} flexDirection="column" alignContent="center" onClick={e => e.stopPropagation()}>
        <Flex css={modalCss.text} flexDirection="column">
          <h3>{title}</h3>
          {text && <p>{text}</p>}
        </Flex>
        <Flex css={modalCss.buttons}>
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
