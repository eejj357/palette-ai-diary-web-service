import React from 'react';

const InfoPage = () => {
  const backgroundStyle = {
    backgroundImage: 'url("/secretjouju.png")',
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  };

  return (
    <div style={backgroundStyle}>
      <h1>Info Page</h1>
      <p>인포사진넣을게에유~</p>
    </div>
  );
};

export default InfoPage;
