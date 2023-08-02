import { ChangeEvent, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Flex from '../atom/Flex';
import Title from '../atom/Title';
import Toggler from '../atom/Toggler';
import WideButton from '../atom/WideButton';
import Input from '../molecules/Input';

const tmpData = {
  name: 'minjae3',
};

const createBoxCss = {
  wrapper: css({
    padding: '5.8rem 2.5rem',
    gap: '3rem',
  }),
  form: css({
    width: '100%',
    gap: '2rem',
  }),
  inputs: css({
    gap: '1rem',
  }),
  toggles: css({
    gap: '0.75rem',
  }),
};

interface FormElement {
  [key: string]: boolean | string;
  name: string;
  owner: string;
  desc: string;
  closed: boolean;
  anonymous: boolean;
}
const CreateBox = () => {
  const [boxForm, setBoxForm] = useState<FormElement>({
    name: '',
    owner: '',
    desc: '',
    closed: false,
    anonymous: true,
  });

  const handleInput = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setBoxForm({ ...boxForm, [key]: e.target.value });
  };

  const handleToggle = (key: string) => () => {
    setBoxForm({ ...boxForm, [key]: !boxForm[key] });
  };

  const createBox = () => {
    const { name, owner, desc } = boxForm;
    if (name && owner && desc) {
      console.log({ ...boxForm });
    }
  };

  useEffect(() => {
    if (tmpData) {
      setBoxForm(pre => {
        return { ...pre, owner: tmpData.name };
      });
    }
  }, [tmpData, setBoxForm]);

  return (
    <Flex css={createBoxCss.wrapper} flexDirection="column" justifyContent="center" alignItems="center">
      <Title text="QA Box 만들기" />
      <Flex css={createBoxCss.form} flexDirection="column">
        <Flex css={createBoxCss.inputs} flexDirection="column">
          <Input text="Name" type="text" input={boxForm.name} handleInput={handleInput('name')} />
          <Input text="Owner" type="text" input={boxForm.owner} handleInput={handleInput('owner')} />
          <Input text="Description" type="text" input={boxForm.desc} handleInput={handleInput('desc')} />
        </Flex>
        <Flex css={createBoxCss.toggles} flexDirection="column">
          <Toggler selected={boxForm.closed} setSelected={handleToggle('closed')} text="질문 기능 비활성화" />
          <Toggler
            selected={boxForm.anonymous}
            setSelected={handleToggle('anonymous')}
            text="익명 질문을 허용합니다."
          />
        </Flex>
        <WideButton text="등록하기" color="white" bgColor="#1C56FC" onClick={createBox} />
      </Flex>
    </Flex>
  );
};

export default CreateBox;
