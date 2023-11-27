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
  const [postContent, setPostContent] = useState('');// content
  const [calendarValue, setCalendarValue] = useState(new Date()); // for 캘린더

  //title 
  const handlePostTitleChange = (event) => {
    if (event.target.value.length <= 27) {
      setPostTitle(event.target.value);
    }
  };

  //content
  const handlePostContentChange = (event) => {
    if (event.target.value.length <= 200) {
      setPostContent(event.target.value);
    }
  };

  const handlePostButtonClick = async () => {
    try {
      // 현재 시간 가져오기
      const currentTime = new Date().toISOString();

      // 서버에 보낼 데이터
      const postData = {
        time: currentTime,
        content: postContent,
      };

      // 서버의 API 엔드포인트로 POST 요청 보내기
      const response = await fetch('your_backend_api_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });


      if (response.ok) {
        console.log('Post successful!');
        // 여기에서 필요한 추가 작업 수행
      } else {
        console.error('Post failed.');
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  //캘린더
  const handleCalendarChange = (value) => {
    setCalendarValue(value);
  }

  //막대그래프
  const BarColor = '#B9DDF1';

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
          <ColoredBarChart
            title="나의 팔레트 ㅤㅤㅤㅤ"
            color={BarColor}
          />


          {/* 캘린더 */}
          <CustomCalendar
            onChange={handleCalendarChange}
            value={calendarValue}
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
              src="/emo_fear_1.png"
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
                  fontSize: '16px',
                  marginLeft: '10px',
                  marginRight: '10px',
                  lineHeight: '1',
                },
              }}
              value={PostTitle}
              onChange={handlePostTitleChange}
              style={{
                marginTop: '30px',
                marginBottom: '20px',
                width: '600px',
              }}
            />
          </Grid>

          {/* CONTENT */}
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="Write about your feeling "
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
              backgroundColor: 'black',
              width: '200px',
            }}
          >
            POST
          </Button>


        </RightPanel>
      </Content>
    </div>
  );
}
