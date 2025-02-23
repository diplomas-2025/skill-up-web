import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Chip,
    Divider,
    Button, Container
} from '@mui/material';
import { Person as PersonIcon, Assignment as AssignmentIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { getTestResult } from '../api/api';

export const TestResultCard = ({ result }) => {
    const { user, test, score } = result;
    const navigate = useNavigate();

    // Переход на страницу курса
    const handleGoToCourse = () => {
        navigate(`/course/${test.courseId}`);
    };

    return (
        <Card sx={{ mb: 2, boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    {/* Аватар пользователя */}
                    <Grid item>
                        <Avatar sx={{ bgcolor: user.role === 'INSTRUCTOR' ? 'primary.main' : 'secondary.main' }}>
                            <PersonIcon />
                        </Avatar>
                    </Grid>

                    {/* Информация о пользователе */}
                    <Grid item xs={8}>
                        <Typography variant="h6">{user.fullName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {user.email}
                        </Typography>
                        <Chip
                            label={user.role === 'INSTRUCTOR' ? 'Преподаватель' : 'Студент'}
                            size="small"
                            color={user.role === 'INSTRUCTOR' ? 'primary' : 'default'}
                            sx={{ mt: 1 }}
                        />
                    </Grid>

                    {/* Баллы */}
                    <Grid item xs={2}>
                        <Typography variant="h5" align="right" color={score >= 80 ? 'success.main' : 'error.main'}>
                            {score}%
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Информация о тесте */}
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar sx={{ bgcolor: 'info.main' }}>
                            <AssignmentIcon />
                        </Avatar>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {test.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Курс ID: {test.courseId}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            onClick={handleGoToCourse}
                            sx={{ textTransform: 'none' }}
                        >
                            Перейти
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const TestResultsList = () => {
    const { courseId } = useParams();
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        getTestResult(courseId).then((r) => setTestResults(r));
    }, [courseId]);

    return (
        <Container sx={{ padding: 3 }}> {/* Отступы по горизонтали */}
            {testResults.map((result) => (
                <TestResultCard key={result.id} result={result} />
            ))}
        </Container>
    );
};

export default TestResultsList;