import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ModeIcon from '@mui/icons-material/Mode';
import LogoutIcon from '@mui/icons-material/Logout';

const Navigation = ({ currentPage, textStyle }) => {
    const isMainPage = currentPage === 'main';
    const isMyPage = currentPage === 'my';
    const isPostPage = currentPage === 'post';

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
                    primary="일기 쓰기"
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

            <ListItemButton component={Link} to="/">
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
