import React, {useEffect, useState} from 'react';
import {
    Container,
    Typography,
    Avatar,
    Button,
    Divider,
    Box,
    Chip,
} from '@mui/material';
import {Logout as LogoutIcon} from '@mui/icons-material';
import {getUserInfo, getUserTestResult} from "../api/api";
import {TestResultCard} from "./TestResultCard"; // Компонент для отображения результатов тестов

const ProfileScreen = () => {
    const [user, setUser] = useState({
        id: 0,
        fullName: '',
        email: '',
        role: '',
    });
    const [testResults, setTestResults] = useState([]); // Состояние для результатов тестов

    // Загрузка данных профиля и результатов тестов
    useEffect(() => {
        getUserInfo().then((data) => {
            setUser(data)
        })
        getUserTestResult().then(data => {
            setTestResults(data)
        })
    }, []);

    // Обработчик выхода из аккаунта
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    };

    return (
        <Container sx={{paddingY: 4}}>
            {/* Заголовок профиля */}
            <Typography variant="h4" component="h1" gutterBottom>
                Профиль пользователя
            </Typography>

            {/* Информация о пользователе */}
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
                <Avatar sx={{width: 64, height: 64, bgcolor: 'primary.main'}}>
                    {user.fullName.charAt(0)}
                </Avatar>
                <Box>
                    <Typography variant="h5">{user.fullName}</Typography>
                    <Typography variant="body1" color="textSecondary">
                        {user.email}
                    </Typography>
                    <Chip
                        label={user.role === 'INSTRUCTOR' ? 'Преподаватель' : 'Студент'}
                        color={user.role === 'INSTRUCTOR' ? 'primary' : 'default'}
                        size="small"
                        sx={{mt: 1}}
                    />
                </Box>
            </Box>

            {/* Кнопка выхода */}
            <Button
                variant="contained"
                startIcon={<LogoutIcon/>}
                onClick={handleLogout}
                sx={{mb: 4}}
            >
                Выйти из аккаунта
            </Button>

            <Divider sx={{mb: 4}}/>

            {/* Список результатов тестов */}
            <Typography variant="h5" gutterBottom>
                Результаты тестов
            </Typography>
            {testResults.length > 0 ? (
                <Container sx={{ paddingX: 3 }}> {/* Отступы по горизонтали */}
                    {testResults.map((result) => (
                        <TestResultCard key={result.id} result={result} />
                    ))}
                </Container>
            ) : (
                <Typography variant="body1" color="textSecondary">
                    Нет результатов тестов.
                </Typography>
            )}
        </Container>
    );
};

export default ProfileScreen;