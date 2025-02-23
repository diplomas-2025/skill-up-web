import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip, Button, DialogTitle, Dialog, DialogContent, DialogActions, Box, IconButton,
} from '@mui/material';
import {getCourseById, getLecturesByCourseId, getTestResults, getTestsByCourseId} from '../api/api';
import {
    Description as LectureIcon,
    Quiz as TestIcon,
    Person as InstructorIcon,
    Close as CloseIcon
} from '@mui/icons-material';

const CourseDetail = () => {
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    const [lectures, setLectures] = useState([]);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [testResult, setTestResult] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const courseData = await getCourseById(courseId);
                const lecturesData = await getLecturesByCourseId(courseId);
                const testsData = await getTestsByCourseId(courseId);
                setCourse(courseData);
                setLectures(lecturesData);
                setTests(testsData);
            } catch (err) {
                setError('Ошибка при загрузке данных курса');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    if (loading) {
        return <Typography align="center">Загрузка...</Typography>;
    }

    if (error) {
        return <Typography color="error" align="center">{error}</Typography>;
    }

    const handleClose = () => {
        setTest(null)
    }

    return (
        <Container maxWidth="md" sx={{mt: 4, mb: 4}}>
            {/* Заголовок курса */}
            <Typography variant="h3" gutterBottom sx={{fontWeight: 'bold', color: 'primary.main'}}>
                {course.title}
            </Typography>

            {/* Информация о преподавателе */}
            <Card sx={{mb: 3, boxShadow: 3}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: 'secondary.main'}}>
                            <InstructorIcon/>
                        </Avatar>
                    }
                    title={course.instructor.fullName}
                    subheader={`Преподаватель курса`}
                />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        Email: {course.instructor.email}
                    </Typography>
                </CardContent>
            </Card>

            {/* Описание курса */}
            <Paper elevation={3} sx={{p: 3, mb: 3, borderRadius: 2}}>
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
                    Описание курса
                </Typography>
                <Typography variant="body1" paragraph>
                    {course.description}
                </Typography>
            </Paper>

            {/* Лекции */}
            <Paper elevation={3} sx={{p: 3, mb: 3, borderRadius: 2}}>
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
                    Лекции
                </Typography>
                {localStorage.getItem("role") === "INSTRUCTOR" &&
                    <Button onClick={() => navigate("/course/" + courseId + "/create-lecture")}>
                        Добавить
                    </Button>
                }
                <List>
                    {lectures.map((lecture) => (
                        <ListItem key={lecture.id} sx={{mb: 1, cursor: "pointer"}} onClick={() => navigate('/lesson/' + lecture.id)}>
                            <ListItemIcon>
                                <LectureIcon color="primary"/>
                            </ListItemIcon>
                            <ListItemText
                                primary={lecture.title}
                                primaryTypographyProps={{fontWeight: 'medium'}}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Тесты */}
            <Paper elevation={3} sx={{p: 3, mb: 3, borderRadius: 2}}>
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold'}}>
                    Тесты
                </Typography>
                {localStorage.getItem("role") === "INSTRUCTOR" &&
                    <>
                        <Button onClick={() => navigate("/course/" + courseId + "/create-test")}>
                            Добавить
                        </Button>
                        <Button onClick={() => navigate("/course/" + courseId + "/result")}>
                            Результат
                        </Button>
                    </>
                }
                <Grid container spacing={2}>
                    {tests.map((test) => (
                        <Grid item key={test.id}>
                            <Chip
                                icon={<TestIcon/>}
                                label={test.title}
                                variant="outlined"
                                color="secondary"
                                sx={{p: 2, fontSize: '1rem'}}
                                onClick={() => {
                                    getTestResults(test.id).then((data) => {
                                        setTestResult(data)
                                        setTest(test)
                                    }).catch(() => {
                                        setTest(test)
                                    })
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Dialog
                open={test != null}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: 6,
                        minWidth: '400px',
                    },
                }}
            >
                <DialogTitle>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Avatar sx={{bgcolor: 'primary.main', mr: 2}}>
                                <TestIcon/>
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                                {test != null ? test.title : ''}
                            </Typography>
                        </Box>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Paper elevation={0} sx={{p: 2, borderRadius: 2, bgcolor: 'background.paper'}}>
                        <Typography variant="body1" paragraph>
                            {test != null ? test.description : ''}
                        </Typography>
                        {testResult != null && (
                            <Box
                                sx={{
                                    bgcolor: 'primary.light',
                                    p: 2,
                                    borderRadius: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold" color="primary.contrastText">
                                    Ваш результат: {testResult.score}
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </DialogContent>
                <DialogActions sx={{p: 2}}>
                    <Button
                        onClick={handleClose}
                        color="secondary"
                        variant="outlined"
                        sx={{borderRadius: 2}}
                    >
                        Отмена
                    </Button>
                    <Button
                        disabled={testResult != null}
                        onClick={() => navigate(`/test/${test.id}`)}
                        color="primary"
                        variant="contained"
                        sx={{borderRadius: 2}}
                    >
                        Начать тест
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CourseDetail;