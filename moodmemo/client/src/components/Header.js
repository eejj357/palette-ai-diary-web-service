import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="absolute" style={{ backgroundColor: '#DCEBEB', boxShadow: 'none' }}>
      <Toolbar style={{ borderBottom: 'none' }}>
        {/* 로고 이미지 */}
        <Link to="/">
          <img
            src="logo.png"
            alt="Logo"
            style={{
              width: '30px',
              marginLeft: '20px',
              marginRight: '15px',
              marginTop: '10px',
            }}
          />
        </Link>

        {/* 텍스트 */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography component="h1" variant="h6" color="black" fontWeight="bold" noWrap>
            감정 팔레트
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
