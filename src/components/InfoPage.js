import React from 'react';
import { useHistory } from 'react-router-dom';
import { CssBaseline, Button, Container, Box } from '@mui/material';

export default function Info() {
  const history = useHistory();

  const handleButtonClick = (path) => {
    history.push(path);
  };

  const backgroundStyle = {
    backgroundImage: 'url("/info.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundAttachment: 'scroll',  // Allow scrolling to see the full image
    height: '6000px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };





  return (
    <div style={backgroundStyle}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop : '5500px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            gap: 8,
            alignItems: 'center', // 세로 중앙 정렬
          }}
        >
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              fontSize: '1.2rem',         
              backgroundColor: '#F7E2E1',
              boxShadow: 'none',   
              border: 'none',  
              color: 'black',  
              fontWeight: 'bold',          
            }}
            onClick={() => handleButtonClick('/signin')}
          >
            로그인
          </Button>

          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              fontSize: '1.2rem',         
              backgroundColor: '#F7E2E1',
              boxShadow: 'none',   
              border: 'none',  
              color: 'black',    
              fontWeight: 'bold',  // 일반적으로 bold는 700, 900까지 조절 가능 -> 나중에 변경       
            }}
            onClick={() => handleButtonClick('/signin')}
          >
            회원가입
          </Button>
        </Box>
      </Container>
    </div>
  );
}  