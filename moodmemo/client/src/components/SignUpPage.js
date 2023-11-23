import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
  const navigate = useNavigate();

  // 입력된 user 정보를 저장할 state 정의
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [isAgreed, setIsAgreed] = useState(false);

  // 각 입력 필드에 대한 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // 회원가입 요청을 서버에 보내는 함수
  const handleSignup = async () => {
    try {
      // 개인정보 수집 및 이용 동의 여부 확인
      if (!isAgreed) {
        toast.warning('개인정보 수집 및 이용에 동의하여 주십시오');
        return;
      }


      // 서버에 보낼 데이터 준비
      const userData = {
        email: user.email,
        password: user.password,
        firstname: user.firstName,
        lastname: user.lastName,
      };

      // login API 호출
      const response = await axios.post(`/register`, userData);

      // 응답이 성공인 경우
      if (response.data.success) {
        // 팝업 표시
        toast.success('회원가입이 완료되었습니다', {
          onClose: () => {
            // 팝업 닫힐 때 로그인 페이지로 이동
            navigate('/signin');
          }
        });
      } else {
        toast.error(`회원가입에 실패하였습니다`);
        console.error('회원가입 실패:', response.data.message);
      }
    } catch (error) {
      toast.error('오류가 발생하였습니다');
      console.error('로그인 중 오류:', error);
    }
  };

  // 체크박스 상태 변경 핸들러
  const handleAgreeChange = () => {
    setIsAgreed((prevIsAgreed) => !prevIsAgreed);
  };


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>

                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                  <Checkbox 
                    value="allowExtraEmails" 
                    color="primary" 
                    checked={isAgreed}
                    onChange={handleAgreeChange}
                    />
                  }
                  label="개인정보 수집 및 이용에 동의합니다"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link
               component = {RouterLink}
               to="/signin" 
               variant="body2" 
               sx={{ cursor: 'pointer' }}
              >  
               {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
        </Box>

        <ToastContainer autoClose={5000}/>
      </Container> 
  );
}