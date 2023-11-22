import React from 'react';
import { useHistory } from 'react-router-dom';
import { CssBaseline, Button, Container, Box } from '@mui/material';

export default function SignUp() {
  const history = useHistory();

  const handleButtonClick = (path) => {
    history.push(path);
  };

  const backgroundStyle = {
    backgroundImage: 'url("/secretjouju.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
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
            marginTop: 80,            //버튼 높이 결정
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
            sx={{ mt: 3, mb: 2, backgroundColor: 'gray' }}
            onClick={() => handleButtonClick('/signin')}
          >
            Sign In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: 'gray' }}
            onClick={() => handleButtonClick('/signup')}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </div>
  );
}  