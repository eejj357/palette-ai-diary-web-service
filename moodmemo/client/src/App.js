import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import MainPage from './components/MainPage';
import MyPage from './components/MyPage';
import InfoPage from './components/InfoPage';
import PostPage from './components/PostPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'MapoFlowerIsland, sans-serif', // sans-serif를 추가해야 합니다.
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/" element={<InfoPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;