import React, {useEffect, useState} from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Grid,
    Box,
    Skeleton,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button, Divider, Chip,
} from '@mui/material';
import {getAllCourses} from '../api/api';
import {useNavigate} from 'react-router-dom';
import {School as CourseIcon, Add as AddIcon} from '@mui/icons-material';
import { Person as PersonIcon } from '@mui/icons-material';

export const MainPage = () => {
    return <CourseList/>;
};

const CourseList = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterInstructor, setFilterInstructor] = useState('');
    const [sortBy, setSortBy] = useState('title');

    // Загрузка курсов при монтировании компонента
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getAllCourses();
                setCourses(response);
            } catch (err) {
                setError('Ошибка при загрузке курсов');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Функция для фильтрации и сортировки курсов
    const filteredAndSortedCourses = courses
        .filter((course) => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesInstructor = filterInstructor
                ? course.instructor.fullName === filterInstructor
                : true;
            return matchesSearch && matchesInstructor;
        })
        .sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'instructor') {
                return a.instructor.fullName.localeCompare(b.instructor.fullName);
            }
            return 0;
        });

    // Уникальные преподаватели для фильтрации
    const uniqueInstructors = [...new Set(courses.map((course) => course.instructor.fullName))];

    if (loading) {
        return (
            <Container maxWidth="md" sx={{mt: 4}}>
                <Typography variant="h4" align="center" gutterBottom>
                    Курсы
                </Typography>
                <Grid container spacing={3}>
                    {[...Array(6)].map((_, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Skeleton variant="rectangular" height={200}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center" sx={{mt: 4}}>
                {error}
            </Typography>
        );
    }

    return (
        <Container maxWidth="md" sx={{mt: 4, mb: 4}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4}}>
                <Typography variant="h4" sx={{fontWeight: 'bold', color: 'primary.main'}}>
                    Курсы
                </Typography>
                {localStorage.getItem("role") === "INSTRUCTOR" &&
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={() => navigate('/create-course')}
                    >
                        Добавить курс
                    </Button>
                }
            </Box>

            {/* Поиск и фильтры */}
            <Box sx={{mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap'}}>
                <TextField
                    label="Поиск по названию"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{flex: 2}}
                />
                <FormControl variant="outlined" sx={{flex: 1}}>
                    <InputLabel>Фильтр по преподавателю</InputLabel>
                    <Select
                        value={filterInstructor}
                        onChange={(e) => setFilterInstructor(e.target.value)}
                        label="Фильтр по преподавателю"
                    >
                        <MenuItem value="">Все преподаватели</MenuItem>
                        {uniqueInstructors.map((instructor) => (
                            <MenuItem key={instructor} value={instructor}>
                                {instructor}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{flex: 1}}>
                    <InputLabel>Сортировка</InputLabel>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Сортировка">
                        <MenuItem value="title">По названию</MenuItem>
                        <MenuItem value="instructor">По преподавателю</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {courses.length > 0 ? (
                courses.map((course) => <CourseCard key={course.id} course={course} />)
            ) : (
                <Typography variant="body1" color="textSecondary">
                    Нет доступных курсов.
                </Typography>
            )}
        </Container>
    );
};

const CourseCard = ({ course }) => {
    const navigate = useNavigate()
    const { title, description, instructor } = course;

    return (
        <Card sx={{ mb: 3, boxShadow: 3, cursor: "pointer" }} onClick={() => navigate("/course/" + course.id)}>
            <CardContent>
                {/* Заголовок и описание курса */}
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                    {description}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Информация о преподавателе */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <PersonIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1">{instructor.fullName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {instructor.email}
                        </Typography>
                        <Chip
                            label={instructor.role === 'INSTRUCTOR' ? 'Преподаватель' : 'Студент'}
                            size="small"
                            color={instructor.role === 'INSTRUCTOR' ? 'primary' : 'default'}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
