import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardHeader, Avatar, Grid } from '@mui/material';
import {getAllCourses} from "../api/api";


export const MainPage = () => {
    return <>
        <CourseList/>
    </>
}

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Загрузка курсов при монтировании компонента
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getAllCourses()
                setCourses(response);
            } catch (err) {
                setError('Ошибка при загрузке курсов');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <Typography align="center">Загрузка...</Typography>;
    }

    if (error) {
        return <Typography color="error" align="center">{error}</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Курсы
            </Typography>
            <Grid container spacing={3}>
                {courses.map((course) => (
                    <Grid item key={course.id} xs={12} sm={6} md={4}>
                        <Card elevation={3}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                        {course.instructor.fullName.charAt(0)}
                                    </Avatar>
                                }
                                title={course.title}
                                subheader={`Преподаватель: ${course.instructor.fullName}`}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {course.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};