import React, { useState } from 'react';
import styled from 'styled-components';

import Input from 'components/common/Input';

import { HiArrowRightCircle } from 'react-icons/hi2';

const ConfirmForm = ({ onConfirmed, confirmCode }) => {
  const [code, setCode] = useState('');
  const [comfirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState('인증 번호를 입력하세요');
  const onChangeHandler = (e) => {
    setCode(e.target.value);
  };

  const onClick = (e) => {
    //수정할거: 이메일 인증 요청하기
    if (confirmCode !== code)
      return setMessage('인증번호가 일치하지 않습니다.');
    setConfirmed(true);
    setTimeout(onConfirmed, 2000);
  };
  // ###############################

  return (
    <FormWrapper>
      {comfirmed ? (
        <div>인증되었습니다.</div>
      ) : (
        <>
          <div>{message}</div>
          <div style={{ marginBottom: '1rem' }}>
            인증번호를 발송하였습니다. <br /> 메일함을 확인해주세요.
          </div>
          <Input
            type="code"
            name="code"
            value={code}
            onChange={onChangeHandler}
            placeholder={'인증번호'}
            shadow={'shadow'}
          />
          <HiArrowRightCircle onClick={onClick} />
        </>
      )}
    </FormWrapper>
  );
};

export default ConfirmForm;

const FormWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div:first-child {
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.color.blueColor};
  }

  & > svg {
    color: ${(props) => props.theme.color.primary};
    font-size: 3rem;
    margin-top: 0.5rem;
  }
`;
