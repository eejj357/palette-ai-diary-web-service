import React from 'react';

const InfoPage = () => {
  const backgroundStyle = {
    backgroundImage: 'url("/secretjouju.png")',
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  };

  return (
    <div style={backgroundStyle}>
      <h1>Post Page</h1>
      <p>포스트페이지로바꿀거에유~</p>
    </div>
  );
};

export default InfoPage;
