import React, { useState, useEffect } from 'react';
import { CssBaseline, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from './Calendar';
import ColoredBarChart from './BarChart';
import Header from './Header';
import Navigation from './NavigationList';
import axios from 'axios'; 
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(8),
}));


//좌측 패널
const LeftPanel = styled('div')`
  width: 350px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: #FFFFFF;
  height: 100vh;
`;

//우측 패널
const RightPanel = styled('div')`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  margin-bottom: 20px;
  height: 100%;
  border-left: 3px solid #000000; 
`;


//우측패널 상단 이미지 배열 부분
const ImageRow = styled('div')`
  display: flex;
  gap: 50px;
  margin-bottom: 20px;
  margin-top: 20px;
  justify-content: center;
`;

//우측패널 입력창 부분
const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    border: '2px solid black',
  },
  width: '100%',
});


export default function Main() {
  const [PostTitle, setPostTitle] = useState(''); // title 
  const [postContent, setPostContent] = useState(''); // content
  const [calendarValue, setCalendarValue] = useState(new Date()); // for 캘린더

  // title
  const handlePostTitleChange = (event) => {
    if (event.target.value.length <= 27) {
      setPostTitle(event.target.value);
    }
  };

  // content
  const handlePostContentChange = (event) => {
    if (event.target.value.length <= 200) {
      setPostContent(event.target.value);
    }
  };

  const performSentimentAnalysis = async () => {
    try {
      // 감정 분석을 위한 데이터
      const sentimentData = {
        sentences: postContent,
      };

      // Flask 서버에 감정 분석 요청 보내기
      const sentimentResponse = await axios.post('http://127.0.0.1:5001/predict', sentimentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 감정 분석 결과 사용
      const emotionResult = sentimentResponse.data.predictions;
      console.log('Emotion Result:', emotionResult);
      return emotionResult;
    } catch (err) {
      console.error('감정 분석 중 오류가 발생하였습니다', err);
    }
  };


  const handlePostButtonClick = async () => {
    try {
      // 현재 시간 가져오기
      const currentDate = new Date().toISOString();

      // 감정 분석 실행
      const emotionResult = await performSentimentAnalysis();

      // 서버에 보낼 데이터
      const postData = {
        date: currentDate,
        title: PostTitle,
        content: postContent,
        emotion: emotionResult,
      };

      // 쿠키에서 토큰을 가져옵니다.
      const authToken = Cookies.get('hasVisited');

      // 서버의 API 엔드포인트로 POST 요청 보내기
      const response = await axios.post('/api/diary', postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        }
      });


      if (response.status === 201) {
        console.log('Post successful!');
        toast.success('일기가 성공적으로 저장되었습니다');
        // 입력 필드 초기화
        setPostTitle('');
        setPostContent('');
      } else {
        console.error('Post failed.');
        toast.error('일기 저장에 실패하였습니다', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  // 캘린더
  const handleCalendarChange = (value) => {
    setCalendarValue(value);
  }


  useEffect(() => {
    // Fetch data or perform any side effect based on your needs
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <CssBaseline />

      {/* 상단바*/}
      <Header />
      
      {/* 상단바 제외 나머지 부분*/}
      <Content>
        {/* 좌측패널 - nav */}
        <LeftPanel>
          <Navigation currentPage="post"  />

          {/* 막대그래프 */}
          <ColoredBarChart/>


          {/* 캘린더 */}
          <CustomCalendar
            onChange={handleCalendarChange}
            value={calendarValue}
            pageType="my"
          />
        </LeftPanel>
        
        {/* 우측패널 - 상단 : 이미지, 하단 : 텍스트 입력칸 */}
        <RightPanel>
          <ImageRow>
            <img
              src="/emo_happy_1.png"
              alt="emo 1"
              style={{ width: '100px', height: '100px' }}
            />
            <img
              src="/emo_angry_1.png"
              alt="emo 2"
              style={{ width: '100px', height: '100px' }}
            />
            <img
              src="/emo_neutral_1.png"
              alt="emo 3"
              style={{ width: '100px', height: '100px' }}
            />
            <img
              src="/emo_anxiety_1.png"
              alt="emo 4"
              style={{ width: '100px', height: '100px' }}
            />
            <img
              src="/emo_sad_1.png"
              alt="emo 5"
              style={{ width: '100px', height: '100px' }}
            />
          </ImageRow>

            {/* TITLE */}
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="제목 "
              multiline
              rows={1}
              variant="outlined"
              InputLabelProps={{
                style: { marginTop: '-5px' },
              }}
              inputProps={{
                maxLength: 27,
                style: {
                  fontSize: '20px',
                  marginLeft: '10px',
                  marginRight: '10px',
                  lineHeight: '1',
                },
              }}
              value={PostTitle}
              onChange={handlePostTitleChange}
              style={{
                marginTop: '30px',
                width: '600px',
              }}
            />
          </Grid>

          {/* CONTENT */}
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="오늘의 감정을 작성해주세요"
              multiline
              rows={14}
              variant="outlined"
              InputLabelProps={{
                style: { marginTop: '-5px' },
              }}
              inputProps={{
                maxLength: 200,
                style: {
                  fontSize: '16px',
                  marginLeft: '10px',
                  marginRight: '10px',
                  marginBottom: '10px',
                  lineHeight: '1.6',
                },
              }}
              value={postContent}
              onChange={handlePostContentChange}
              style={{
                marginBottom: '10px',
                marginTop: '20px',
                width: '600px',
              }}
            />
          </Grid>
            
          {/*글자수세기 200자 제한*/}
          <Typography
            variant="caption"
            color="textSecondary"
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginLeft: '500px',
              marginTop: '-50px',
              marginBottom: '50px',
              fontFamily: 'MapoFlowerIsland, sans-serif',
            }}
          >
            {`${postContent.length}/200`}
          </Typography>

          {/*POST 버튼*/}
          <Button
            variant="contained"
            onClick={handlePostButtonClick}
            sx={{
              backgroundColor: '#ECA4A4',
              boxShadow: 'none', 
              width: '200px',
            }}
          >
            작성하기
          </Button>
        </RightPanel>
      </Content>
      <ToastContainer autoClose={5000}/>
    </div>
  );
}
