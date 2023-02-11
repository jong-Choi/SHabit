import React, { useEffect,useRef } from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { BiDownload } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { setVideoModal } from '../../store/trackingSlice';

export default function VideoModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recordedVideoRef = useRef(null);//recordedVideo
  const recordedChunks= useSelector((state) => {
    return state.tracking.recordedChunks;
  });

  const downloadVideo = ()=>{
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "MyVideo.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
    dispatch(setVideoModal(false));
    navigate('/main');
  }
  useEffect(()=>{
    if(recordedChunks.length>0){
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      recordedVideoRef.current.src = window.URL.createObjectURL(blob);
      recordedVideoRef.current.playbackRate = 10;
      recordedVideoRef.current.play();
    }
  },[recordedChunks])

  return (
    <ContainerWrapper>
    <ContainerHeader>
      <Title>원하시는 스트레칭 영상 길이를 선택해주세요.</Title>
    </ContainerHeader>
    <Container>
      <VideoWrapper>
        <video autoPlay ref={recordedVideoRef} />
      </VideoWrapper>
      </Container>
      <ContainerFooter>
        <InfoWrapper>
          다운받지 않은 영상은 사라집니다.
        </InfoWrapper>
        <IconWrapper>
          <BiDownload onClick={downloadVideo} />
          다운로드하기
        </IconWrapper>
      </ContainerFooter>
    </ContainerWrapper>
  );
}

const ContainerWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 998;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ContainerHeader = styled.div`
  z-index: 999;
  width: 55rem;
  height: 4rem;
  background-color: ${(props) => props.theme.color.secondary};
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  z-index: 999;
  background-color: ${(props) => props.theme.color.whiteColor};
  width: 55rem;
  height: 21rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;
  font-size: 1.3rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 2rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;

  & > svg {
    font-size: 2.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;
const VideoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  height:90%;
  video{
    height:100%;
  }
`;
const ContainerFooter = styled.div`
  background-color: ${(props) => props.theme.color.whiteColor};
  height: 4rem;
  width: 55rem;
  border-radius: 0 0 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content:flex-end;
  color: ${(props) => props.theme.color.primary};
  padding: 0 1rem 1rem 1rem;
`;
const InfoWrapper = styled.div`
  width:46%;
`;