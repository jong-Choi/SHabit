import React, { useEffect } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Landing/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTokenState, setUserState } from '../store/authSlice';
import { loadEffect } from '../components/common/animation';

export default function LandingPage({ content, form }) {
  // const [content, form] = children;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    dispatch(setTokenState(accessToken));
    dispatch(setUserState(user));
    if (accessToken && user) {
      // navigate('/main'); 로그인 됐을때 이동시키는 로직입니다. 임시 비활성화
    }
  }, [navigate, dispatch]);
  return (
    <PageWrapper>
      <ContainerWrapper>
        <NavContainer>
          <Navbar />
        </NavContainer>
        <ContentContainer>{content}</ContentContainer>
        <FormContainer>{form}</FormContainer>
      </ContainerWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: default;
  }
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NavContainer = styled.div`
  width: 8rem;
  height: 28rem;
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 1.5rem 0 0 1.5rem;
  margin-right: 19rem;

  animation: 0.8s ease-in-out ${loadEffect.right};
`;

const FormContainer = styled.div`
  width: 25rem;
  height: 28rem;
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 0 1.5rem 1.5rem 0;
  margin-left: 11rem;

  animation: 0.8s ease-in ${loadEffect.left};
`;

const ContentContainer = styled.div`
  width: 30rem;
  height: 30rem;
  background-color: ${(props) => props.theme.color.primary};
  position: absolute;
  left: 12.7%;

  animation: 0.8s ease-in ${loadEffect.down};
`;