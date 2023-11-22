import React, { useState, useEffect } from 'react';
import { CssBaseline, Typography, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Content = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: theme.spacing(8),
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'grey',
}));

const LeftPanel = styled('div')`
  width: 300px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: #FFFFFF; 
  height: 100vh;
  border-right: 3px solid #C0C0C0; 
`;


const RightPanel = styled('div')`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  margin-bottom: 20px;
//   border-left: 3px solid #C0C0C0; 
`;

const ImageRow = styled('div')`
  display: flex;
  gap: 50px;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer; /* 이미지를 클릭 가능하도록 설정 */
  justify-content: center; 
`;

export default function Main() {
    const setsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null); // for 필터링

    const dummySetsFromDatabase = [
        { id: 1, image: '/emo_sad.png', text: '1: 여감자' },
        { id: 2, image: '/emo_happy.png', text: '2: 여공주' },
        { id: 3, image: '/emo_angry.png', text: '3: 여미' },
        { id: 4, image: '/emo_anxiety.png', text: '4: 여' },
        { id: 5, image: '/emo_neutral.png', text: '5: 가' },
        { id: 6, image: '/emo_angry.png', text: '6: 나' },
        { id: 7, image: '/emo_neutral.png', text: '7: 다' },
        { id: 8, image: '/emo_neutral.png', text: '8: 라' },
        { id: 9, image: '/emo_neutral.png', text: '9: 마' },
        { id: 10, image: '/emo_happy.png', text: '10: 비' },
        { id: 11, image: '/emo_neutral.png', text: '11: 사' },
        { id: 12, image: '/emo_happy.png', text: '12: 아' },
        { id: 13, image: '/emo_neutral.png', text: '13: 자' },
        { id: 14, image: '/emo_neutral.png', text: '14: 차' },
        { id: 15, image: '/emo_sad.png', text: '15: 카' },

        // ... (더미 데이터 추가)
    ];

    //필터링기능
    const handleImageClick = (image) => {
        // 이미지를 클릭하면서 이미 선택된 이미지와 동일한 경우 선택 해제
        setSelectedImage((prev) => (prev === image ? null : image));
    };

    const filteredSets = selectedImage
        ? dummySetsFromDatabase.filter((set) => set.image === selectedImage)
        : dummySetsFromDatabase;


    //페이지 기능
    const paginateSets = (sets) => {
        const startIndex = (currentPage - 1) * setsPerPage;
        const endIndex = startIndex + setsPerPage;
        return sets.slice(startIndex, endIndex);
    };


    //더미 데이터
    useEffect(() => {
        // Fetch data or perform any side effect based on your needs
    }, []);

    const currentSets = paginateSets(filteredSets);

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar position="absolute">
                <Toolbar>
                    {/* 로고 이미지 */}
                    <img
                        src="logo_180.png"
                        alt="Logo"
                        style={{
                            width: '50px',
                            marginLeft: '10px',
                            marginRight: '15px'
                        }}
                    />

                    {/* 텍스트 */}
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        MOOD MEMO
                    </Typography>
                </Toolbar>
            </AppBar>

            <Content>
                <LeftPanel>
                    <List component="nav">
                        <ListItemButton component={Link} to="/main">
                            <ListItemIcon>
                            <HomeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="HOME"
                                primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                            />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/my">
                            <ListItemIcon>
                                <PersonIcon color="disabled" />
                            </ListItemIcon>
                            <ListItemText primary="MY" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/post">
                            <ListItemIcon>
                                <ModeIcon color="disabled" />
                            </ListItemIcon>
                            <ListItemText primary="POST" />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/">
                            <ListItemIcon>
                                <LogoutIcon color="disabled"  />
                            </ListItemIcon>
                            <ListItemText primary="LOGOUT" />
                        </ListItemButton>
                    </List>
                </LeftPanel>

                <RightPanel>
                    {/* 상단 공간 */}
                    <div>
                        {/* 5개의 이미지 */}
                        <ImageRow>
                            <img
                                src="/emo_happy.png"
                                alt="emo 1"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_happy.png")} />

                            <img
                                src="/emo_angry.png"
                                alt="emo 2"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_angry.png")} />
                            <img
                                src="/emo_neutral.png"
                                alt="emo 3"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_neutral.png")} />
                            <img
                                src="/emo_anxiety.png"
                                alt="emo 4"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_anxiety.png")} />
                            <img
                                src="/emo_sad.png"
                                alt="emo 5"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_sad.png")} />
                        </ImageRow>

                        {/* 내용 넣을 부분 */}
                        {filteredSets.map((set) => (
                            <div
                                key={set.id}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '1000px',
                                    border: '1px solid grey',
                                    borderRadius: '8px',
                                    marginTop: '30px',
                                }}
                            >
                                {/* 이미지 및 텍스트 부분 */}
                                <div
                                    style={{
                                        height: 'auto',
                                        overflow: 'hidden',
                                        borderRadius: '8px 8px 0 0',
                                    }}
                                >
                                    <img
                                        src={set.image}
                                        alt="이미지 설명"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            marginLeft: '15px',
                                            marginTop: '15px',
                                        }}
                                    />
                                </div>
                                <div style={{
                                    padding: '5px',
                                    marginLeft: '20px',
                                    marginBottom: '20px',
                                    height: 'auto'
                                }}>
                                    {set.text}
                                </div>
                            </div>
                        ))}

                        {/* 버튼 설명 */}
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            marginTop: '30px',
                            justifyContent: 'center',  // 수평 정렬
                            alignItems: 'center',

                        }}>
                            <button
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentSets.length < setsPerPage}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </RightPanel>
            </Content>
        </div>
    );
}
