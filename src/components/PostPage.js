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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'grey',
}));

const LeftPanel = styled('div')`
  width: 300px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: #FFFFFF; 
  height: 100vh;
  border-right: 3px solid #C0C0C0; 
`;

const RightPanel = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  background-color: #ffffff; 
`;


const ImageRow = styled('div')`
  display: flex;
  gap: 50px; /* 이미지 사이의 간격을 조절할 수 있습니다. */
  margin-bottom: 20px;
  margin-top: 20px;
  justify-content: center; 
`;


export default function Main() {
  const [postContent, setPostContent] = useState('');

  const handlePostContentChange = (event) => {
    if (event.target.value.length <= 200) {
      setPostContent(event.target.value);
    }
  };

  const handlePostButtonClick = () => {
    console.log('Post Content:', postContent);
    // 여기에서 글을 저장하거나 처리하는 로직을 추가할 수 있습니다.
  };

  useEffect(() => {
    // Fetch data or perform any side effect based on your needs
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          {/* 로고 이미지 */}
          <img
            src="logo_180.png"
            alt="Logo"
            style={{
              width: '50px',
              marginLeft: '10px',
              marginRight: '15px'
            }}
          />

          {/* 텍스트 */}
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            MOOD MEMO
          </Typography>
        </Toolbar>
      </AppBar>

      <Content>
        <LeftPanel>
          <List component="nav">
            <ListItemButton component={Link} to="/main">
              <ListItemIcon>
                <HomeIcon color="disabled" />
              </ListItemIcon>
              <ListItemText primary="HOME" />
            </ListItemButton>

            <ListItemButton component={Link} to="/my">
              <ListItemIcon>
                <PersonIcon color="disabled" />
              </ListItemIcon>
              <ListItemText primary="MY"
              />
            </ListItemButton>

            <ListItemButton component={Link} to="/post">
              <ListItemIcon>
                <ModeIcon />
              </ListItemIcon>
              <ListItemText
                primary="POST"
                primaryTypographyProps={{ style: { fontWeight: 'bold' } }} />
            </ListItemButton>

            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <LogoutIcon color="disabled" />
              </ListItemIcon>
              <ListItemText primary="LOGOUT" />
            </ListItemButton>
          </List>
        </LeftPanel>

        <RightPanel>
          {/* 5개의 이미지 */}
          <ImageRow>
            <img
              src="/emo_happy.png"
              alt="emo 1"
              style={{ width: '100px', height: '100px' }} />

            <img
              src="/emo_angry.png"
              alt="emo 2"
              style={{ width: '100px', height: '100px' }} />
            <img
              src="/emo_neutral.png"
              alt="emo 3"
              style={{ width: '100px', height: '100px' }} />
            <img
              src="/emo_anxiety.png"
              alt="emo 4"
              style={{ width: '100px', height: '100px' }} />
            <img
              src="/emo_sad.png"
              alt="emo 5"
              style={{ width: '100px', height: '100px' }} />
          </ImageRow>


          <Grid item xs={12} sm={6}>
            <TextField
              label="Write your feeling"
              multiline
              rows={14}
              variant="outlined"
              inputProps={{
                maxLength: 200,
                style: {
                  fontSize: '20px',
                  marginTop: '10px',
                  marginLeft: '10px',
                  marginRight: '10px',
                  marginBottom: '10px',
                  lineHeight: '1.6',
                },
              }}
              value={postContent}
              onChange={handlePostContentChange}
              style={{
                marginBottom: '16px',
                marginTop: '50px',
                width: '550px',
              }}
            />
          </Grid>
          <Typography
            variant="caption"
            color="textSecondary"
            style={{
              position: 'fixed',
              bottom: '220px',
              right: '550px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            {`${postContent.length}/200`}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePostButtonClick}
            sx={{ backgroundColor: 'gray' }}
          >
            POST
          </Button>
        </RightPanel>

      </Content>
    </div>
  );
}
