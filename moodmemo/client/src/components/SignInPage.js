import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignInSide() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // 토큰이 있는 경우, 사용자를 대시보드 페이지로 이동
      navigate('/main');
    }
  })


  // 로그인 핸들러
  const handleSignin = async() => {
    try {
      const response = await axios.post('/login', { email, password });

      if (response.data.loginSuccess) {
        // 로그인 성공 시 token을 local storage에 저장
        localStorage.setItem('token', response.data.token);

        // 메인 페이지로 이동
        navigate('/main');
        // 팝업 표시
        // toast.success('로그인에 성공하였습니다')
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (err) {
      console.error('로그인 중 오류:', err)
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />

      {/* 좌측 사진 넣는 부분*/}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/mm.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/*우측 내용 부분*/}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          {/* 자물쇠 아이콘 + 동그라미 */}
          <Avatar sx={{
            m: 1,
            backgroundColor: 'black',
            // border: '1px solid white' 
          }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* SIGN IN 문구*/}
          <Typography 
          component="h1" 
          variant="h5"
          sx={{ fontWeight: 'bold' }} 
          >
            Sign in
          </Typography>
          
          {/*이메일 칸*/}
          <TextField
            margin="normal"
            required
            sx={{
              width: '80%',
              '& .MuiInputLabel-root': {  // 사용자 정의 라벨 스타일
                fontWeight: 'bold',
              },
            }}
            id="email"
            label="Email Address"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 비밀번호 칸*/}
          <TextField
            margin="normal"
            required
            sx={{ width: '80%',
            '& .MuiInputLabel-root': {  // 사용자 정의 라벨 스타일
              fontWeight: 'bold',
            },
           }}
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* SIGN IN 버튼 */}
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '80%', mt: 3, mb: 2, backgroundColor: 'black' }}
            onClick={handleSignin}
          >
            Sign In
          </Button>

          {/* SIGN UP으로 넘어가도록 링크 연결 */}
          <Link
            component={RouterLink}
            to="/signup"
            variant="body2"
            sx={{
              cursor: 'pointer',
              color: 'black',  // Sign Up 글자 색
              textDecorationColor: 'black',  // 밑줄 색
            }}
          >
            {"Sign Up"}
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
