import React, { useState, useEffect } from 'react';
import { CssBaseline, Typography, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(8),
}));

//상단바 
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'transparent',
  borderBottom: '3px solid black',
  boxShadow: 'none',
}));

//좌측 패널
const LeftPanel = styled('div')`
  width: 350px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: #FFFFFF;
  height: 100vh;
  border-right: 3px solid #000000;
`;

//우측 패널
const RightPanel = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  background-color: #ffffff;
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

  const handlePostTitleChange = (event) => {
    if (event.target.value.length <= 27) {
      setPostTitle(event.target.value);
    }
  };

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

  useEffect(() => {
    // Fetch data or perform any side effect based on your needs
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <CssBaseline />

      {/* 상단바*/}
      <AppBar position="absolute">
                <Toolbar>
                    {/* 로고 이미지 */}
                    <Link to="/">
                        <img
                            src="logo_180.png"
                            alt="Logo"
                            style={{
                                width: '50px',
                                marginLeft: '20px',
                                marginRight: '15px',
                            }}
                        />
                    </Link>

                    {/* 텍스트 */}
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography  component="h1" variant="h6" color="black" fontWeight="bold" noWrap>
                            MOOD MEMO
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>

      {/* 상단바 제외 나머지 부분*/}
      <Content>
        {/* 좌측패널 - nav */}
        <LeftPanel>
          <List component="nav">
            <ListItemButton component={Link} to="/main">
              <ListItemIcon>
                <HomeIcon fontSize="large"  color="disabled"/>
              </ListItemIcon>
              <ListItemText
                primary="HOME"
                primaryTypographyProps={{
                  style: { fontSize: '1.3em' },
                }}
              />
            </ListItemButton>

            <ListItemButton component={Link} to="/my">
              <ListItemIcon>
                <PersonIcon fontSize="large" color="disabled" />
              </ListItemIcon>
              <ListItemText
                primary="MY"
                primaryTypographyProps={{
                  style: { fontSize: '1.3em' },
                }}
              />
            </ListItemButton>

            <ListItemButton component={Link} to="/post">
              <ListItemIcon>
                <ModeIcon fontSize="large"  />
              </ListItemIcon>
              <ListItemText
                primary="POST"
                primaryTypographyProps={{
                  style: { fontWeight: 'bold', fontSize: '1.3em' },
                }}
              />
            </ListItemButton>

            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <LogoutIcon fontSize="large" color="disabled" />
              </ListItemIcon>
              <ListItemText
                primary="LOGOUT"
                primaryTypographyProps={{
                  style: { fontSize: '1.3em' },
                }}
              />
            </ListItemButton>
          </List>
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
              label="Title "
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
              position: 'fixed',
              bottom: '220px',
              right: '530px',
              fontSize: '16px',
              fontWeight: 'bold',
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
              width : '200px',       
            }}
          >
            POST
          </Button>


        </RightPanel>
      </Content>
    </div>
  );
}
