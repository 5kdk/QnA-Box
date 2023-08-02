import { css } from '@emotion/react';
import Flex from '../atom/Flex';
import Button from '../atom/Button';

const modalCss = {
  modal: css({
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '20',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
  }),
  infoBox: css({
    width: '28rem',
    padding: '3rem 1.5rem',
    gap: '2rem',
    backgroundColor: 'white',
  }),
  text: css({
    gap: '0.5rem',
    '> p': {
      fontSize: '14px',
    },
  }),
  buttons: css({
    alignSelf: 'flex-end',
    gap: '0.7rem',
  }),
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
            color="black"
            bgColor="white"
            borderColor="#D6D6D6"
            onClick={normalBtn.onClick}
          />
          <Button text={importantBtn.text} color="white" bgColor="black" onClick={importantBtn.onClick} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InfoModal;
