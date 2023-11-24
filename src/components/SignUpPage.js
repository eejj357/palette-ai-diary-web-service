import React from 'react';
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
import { Link as RouterLink } from 'react-router-dom'; 

export default function SignUp() {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {/* 내용 부분*/}
        <Box
          sx={{
            marginTop: 8,
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
          
          {/* SIGN UP 문구*/}
          <Typography 
          component="h1" 
          variant="h5"
          sx={{ fontWeight: 'bold' }} >
            Sign up
          </Typography>
          
            {/* 성, 이름, 이메일, 비밀번호*/}
            <Grid container spacing={2}>
               {/*성 칸*/}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  margin="normal"
                  sx={{
                    '& .MuiInputLabel-root': {  // 사용자 정의 라벨 스타일
                      fontWeight: 'bold',
                    },
                  }}
                />
              </Grid>

                {/*이름 칸*/}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  margin="normal"
                  sx={{
                    '& .MuiInputLabel-root': {  // 사용자 정의 라벨 스타일
                      fontWeight: 'bold',
                    },
                  }}
                />
              </Grid>
                  
               {/*이메일 칸*/}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  sx={{
                    '& .MuiInputLabel-root': {  // 사용자 정의 라벨 스타일
                      fontWeight: 'bold',
                    },
                  }}
                />
              </Grid>

              {/*비밀번호 칸*/}
              <Grid item xs={12}>

                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  sx={{
                    '& .MuiInputLabel-root': {  // 사용자 정의 라벨 스타일
                      fontWeight: 'bold',
                    },
                  }}
                />
              </Grid>

              {/*개인정보 수집 동의 체크박스*/}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label={
                    <Typography 
                    // sx={{ fontWeight: 'bold' }}
                    >
                      개인정보 수집 및 정보이용에 동의합니다.
                    </Typography>
                  }
                />
              </Grid>
            </Grid>

            {/* SIGN UP 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,backgroundColor: 'black' }}
            >
              Sign Up
            </Button>

            {/*SIGN IN으로 넘어가도록 링크 연결 */}
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link
               component = {RouterLink}
               to="/signin" 
               variant="body2" 
               sx={{
                cursor: 'pointer',
                color: 'black',  // Sign Up 글자 색
                textDecorationColor: 'black',  // 밑줄 색
              }}
              >  
               {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Container>
      
  );
}