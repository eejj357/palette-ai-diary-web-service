import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navigation = ({ currentPage, textStyle }) => {
    const navigate = useNavigate();
    
    const isMainPage = currentPage === 'main';
    const isMyPage = currentPage === 'my';
    const isPostPage = currentPage === 'post';

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
        <List component="nav">
            <ListItemButton component={Link} to="/main">
                <ListItemIcon>
                    <HomeIcon fontSize="large" color={isMyPage || isPostPage ? 'disabled' : 'inherit'} />
                </ListItemIcon>
                <ListItemText
                    primary="우리의 팔레트"
                    primaryTypographyProps={{
                        style: {
                            fontWeight: isMainPage ? '600' : '580',
                            fontSize: '1.3em',
                            WebkitTextStroke: isMainPage ? '0.1px black' : 'none',
                            ...textStyle,
                        }
                    }}
                />
            </ListItemButton>

            <ListItemButton component={Link} to="/my">
                <ListItemIcon>
                    <PersonIcon fontSize="large" color={isMainPage || isPostPage ? 'disabled' : 'inherit'} />
                </ListItemIcon>
                <ListItemText
                    primary="나의 팔레트"
                    primaryTypographyProps={{
                        style: {
                            fontWeight: isMyPage ? '600' : '580',
                            fontSize: '1.3em',
                            WebkitTextStroke: isMyPage ? '0.1px black' : 'none',
                            ...textStyle,
                        }
                    }}
                />
            </ListItemButton>

            <ListItemButton component={Link} to="/post">
                <ListItemIcon>
                    <ModeIcon fontSize="large" color={isMyPage || isMainPage ? 'disabled' : 'inherit'} />
                </ListItemIcon>
                <ListItemText
                    primary="일기 작성"
                    primaryTypographyProps={{
                        style: {
                            fontWeight: isPostPage ? '600' : '580',
                            fontSize: '1.3em',
                            WebkitTextStroke: isPostPage ? '0.1px black' : 'none',
                            ...textStyle,
                        }
                    }}
                />
            </ListItemButton>

            <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutIcon fontSize="large" color="disabled" />
                </ListItemIcon>
                <ListItemText
                    primary="로그아웃"
                    primaryTypographyProps={{
                        fontWeight:  '580',
                        style: { fontSize: '1.3em' },
                    }}
                />
            </ListItemButton>
    </List >
  );
};

export default Navigation;
