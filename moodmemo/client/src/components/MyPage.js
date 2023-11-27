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
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Calendar from 'react-calendar'; 
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Content = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: theme.spacing(8),
}));

//상단바
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    backgroundColor: 'transparent', // 배경색을 투명으로 설정
    borderBottom: '3px solid black', // 아래에 검정색 테두리 추가
    boxShadow: 'none', //그림자효과제거
}));

//좌측 패널 
const LeftPanel = styled('div')`
  width: 300px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: #FFFFFF; 
  height: 100vh;
`;

//우측 패널 
const RightPanel = styled('div')`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  margin-bottom: 20px;
  height: 100%;
  border-left: 5px solid #000000; 
`;

//우측 패널 상단 이미지 6개 
const ImageRow = styled('div')`
  display: flex;
  gap: 50px;
  margin-bottom: 20px;
  margin-top: 20px;
  cursor: pointer; /* 이미지를 클릭 가능하도록 설정 */
  justify-content: center; 
`;


export default function Main() {
    const navigate = useNavigate();

    const setsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null); // for 필터링
    const [userDiaries, setUserDiaries] = useState([]);


    //필터링 기능
    const handleImageClick = (image) => {
        // 이미지를 클릭하면서 이미 선택된 이미지와 동일한 경우 선택 해제
        setSelectedImage((prev) => (prev === image ? null : image));
    };

    //페이지 기능
    const paginateSets = (sets) => {
        const startIndex = (currentPage - 1) * setsPerPage;
        const endIndex = startIndex + setsPerPage;
        return sets.slice(startIndex, endIndex);
    };

    const currentSets = paginateSets(
        selectedImage
            ? userDiaries.filter((set) => set.emotion === selectedImage)
            : userDiaries
    );


    // 서버에서 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 서버로부터 사용자의 일기를 가져옴
                const response = await axios.get('api/get-my-diaries');

                if (response.data) {
                    setUserDiaries(response.data);
                } else {
                    console.error('서버로부터 일기를 가져오는 데 문제 발생');
                } 
            } catch (err) {
                console.error('오류 발생!', err);
            }
        };

        fetchData();  // fetchData 함수 호출
    }, []);


    // 로그아웃 핸들러
    const handleLogout = async () => {
        try {
        // 로그아웃 API 호출
        const response = await axios.get('/api/user/logout');

        if (response.data.success) {
            // 로그아웃 성공 시 로그인 페이지로 이동
            navigate('/');

            toast.success('로그아웃되었습니다');  // 팝업창 안뜸

            // 로컬 스토리지에서 토큰 제거
            localStorage.removeItem('token');
        } else {
            // 로그아웃 실패 시 에러 메세지 표시
            toast.error(response.data.message);
        }
        } catch (err) {
        console.error('로그아웃 중 오류:', err);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            <CssBaseline />

            {/*  상단바 */}
            <AppBar position="absolute">
                <Toolbar>
                    {/* 로고 이미지 */}
                    <img
                        src="logo_180.png"
                        alt="Logo"
                        style={{
                            width: '50px',
                            marginLeft: '20px',
                            marginRight: '15px'
                        }}
                    />

                    {/* 텍스트 */}
                    <Typography component="h1" variant="h6" color="black" fontWeight="bold" noWrap>
                        MOOD MEMO
                    </Typography>

                </Toolbar>
            </AppBar>

            {/* 내용 */}
            <Content>
                {/* 좌측 패널*/}
                <LeftPanel>
                    <List component="nav">
                        <ListItemButton component={Link} to="/main">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="HOME"
                                primaryTypographyProps={{
                                    style: {  fontSize: '1.3em' } // 적절한 값을 선택
                                }}
                            />
                        </ListItemButton>


                        <ListItemButton component={Link} to="/my">
                            <ListItemIcon>
                                <PersonIcon color="disabled" />
                            </ListItemIcon>
                            <ListItemText
                                primary="MY"
                                primaryTypographyProps={{
                                    style: { fontWeight: 'bold',fontSize: '1.3em' } // 적절한 값을 선택
                                }}
                            />
                        </ListItemButton>

                        <ListItemButton component={Link} to="/post">
                            <ListItemIcon>
                                <ModeIcon color="disabled" />
                            </ListItemIcon>
                            <ListItemText
                                primary="POST"
                                primaryTypographyProps={{
                                    style: { fontSize: '1.3em' } // 적절한 값을 선택
                                }}
                            />
                        </ListItemButton>

                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon color="disabled" />
                            </ListItemIcon>
                            <ListItemText
                                primary="LOGOUT"
                                primaryTypographyProps={{
                                    style: { fontSize: '1.3em' } // 적절한 값을 선택
                                }}
                            />
                        </ListItemButton>
                    </List>

                    {/* 캘린더 추가 */}
                    <div style={{ marginTop: 'auto' }}>
                        <Calendar />
                    </div>
                </LeftPanel>

                {/*우측패널 */}
                <RightPanel>
                    {/* 상단 공간 */}
                    <div>
                        {/* 6개의 이미지 */}
                        <ImageRow>
                            <img
                                src="/CLICK.png"
                                alt="click"
                                style={{ width: '100px', height: '100px' }}
                            />
                            <img
                                src="/emo_happy_1.png"
                                alt="emo 1"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_happy_1.png")} />

                            <img
                                src="/emo_angry_1.png"
                                alt="emo 2"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_angry_1.png")} />
                            <img
                                src="/emo_neutral_1.png"
                                alt="emo 3"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_neutral_1.png")} />
                            <img
                                src="/emo_anxiety_1.png"
                                alt="emo 4"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_anxiety_1.png")} />
                            <img
                                src="/emo_sad_1.png"
                                alt="emo 5"
                                style={{ width: '100px', height: '100px' }}
                                onClick={() => handleImageClick("/emo_sad_1.png")} />
                        </ImageRow>

                        {/* 내용 넣을 부분 : SET(이미지 + 작성시간 + 글)*/}
                        {currentSets.map((set) => (
                            <div
                                key={set.user}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '1000px',
                                    border: '2px solid black',
                                    borderRadius: '8px',
                                    marginTop: '30px',
                                }}
                            >
                                {/* 이미지 및 작성시간 부분  : SET중이미지 + 작성시간)*/}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        height: 'auto',
                                        overflow: 'hidden',
                                        borderRadius: '8px 8px 0 0',
                                    }}
                                >
                                    <div>
                                        <img
                                            src={set.emotion}
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
                                        marginRight: '15px',
                                        marginTop: '-20px',
                                        fontSize: '14px',
                                    }}>

                                        <span style={{ fontWeight: 'bold' }}>
                                            {new Date(set.date).toLocaleString('ko-KR',
                                                {
                                                    hour12: false,
                                                    year: '2-digit',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                })}
                                        </span>
                                    </div>
                                </div>


                                {/* 글 내용 부분 : SET중(글) */}
                                <div style={{
                                    padding: '5px',
                                    marginLeft: '20px',
                                    marginBottom: '20px',
                                    height: 'auto'
                                }}>
                                    {set.content}
                                </div>
                            </div>
                        ))}


                        {/* 이전 다음 페이지 전환 버튼 */}
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
                                style={{
                                    padding: '10px',
                                    width: '100px',  // 버튼 크기 조절
                                    fontWeight: 'bold',   
                                    fontSize: '14px',  
                                    backgroundColor: 'white', 
                                    border: '2px solid black',  
                                    borderRadius: '5px',      
                                    cursor: 'pointer',         // 마우스 오버 시 포인터로 변경
                                }}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentSets.length < setsPerPage}
                                style={{
                                    padding: '10px',
                                    width: '100px',  // 버튼 크기 조절
                                    fontWeight: 'bold',   
                                    fontSize: '14px',  
                                    backgroundColor: 'white',  
                                    border: '2px solid black', 
                                    borderRadius: '5px',       
                                    cursor: 'pointer',         // 마우스 오버 시 포인터로 변경
                                }}
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </RightPanel>
            </Content>
            <ToastContainer autoClose={5000}/>
        </div>
    );
}