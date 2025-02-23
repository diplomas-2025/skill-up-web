import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, Box, Avatar, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import {getUserInfo} from "../api/api";

const Header = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('Иван Иванов');
    const userAvatar = "/user-avatar.png"; // Путь к аватару пользователя

    useEffect(() => {
        getUserInfo().then((data) => {
            setUsername(data.fullName)
        })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    };

    return (
        <AppBar position="static" color="primary" sx={{boxShadow: 3}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', px: 3}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2, cursor: "pointer"}}
                     onClick={() => navigate('/')}>
                    <Avatar src="/logo512.png" alt="Logo" sx={{width: 40, height: 40}}/>
                    <Typography variant="h5" sx={{fontWeight: 'bold', letterSpacing: 1}}>
                        Платформа обучения
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Avatar src={userAvatar} alt={username} sx={{width: 40, height: 40, cursor: "pointer"}}
                            onClick={() => navigate('/profile')}/>
                    <Typography variant="subtitle1" sx={{fontWeight: 'medium', cursor: "pointer"}}
                                onClick={() => navigate('/profile')}>
                        {username}
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
