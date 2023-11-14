import React from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import MainPage from './components/MainPage';
import MyPage from './components/MyPage';
// import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/my" component={MyPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;