import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    Box,
    CircularProgress,
} from '@mui/material';
import {getTestQuestions, submitTest} from '../api/api';

const TestScreen = () => {
    const {testId} = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // { questionId: answerId }
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    // Загрузка вопросов теста
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getTestQuestions(testId);
                setQuestions(data);
            } catch (err) {
                setError('Ошибка при загрузке вопросов теста');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [testId]);

    // Обработка выбора ответа
    const handleAnswerChange = (questionId, answerId) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answerId,
        }));
    };

    // Отправка ответов на сервер
    const handleSubmit = async () => {
        try {
            const formattedAnswers = Object.keys(answers).map((questionId) => ({
                questionId: parseInt(questionId),
                answerId: answers[questionId],
            }));
            const result = await submitTest(testId, {answers: formattedAnswers});
            setResult(result);
        } catch (err) {
            setError('Ошибка при отправке ответов');
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center" mt={4}>
                {error}
            </Typography>
        );
    }

    if (result) {
        return (
            <Container maxWidth="md" sx={{mt: 4}}>
                <Typography variant="h4" align="center" gutterBottom>
                    Результат теста
                </Typography>
                <Paper elevation={3} sx={{p: 3, borderRadius: 2}}>
                    <Typography variant="h6" gutterBottom>
                        Тест: {result.test.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Пользователь: {result.user.fullName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Оценка: {result.score}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/course/${result.test.courseId}`)}
                        sx={{mt: 2}}
                    >
                        Вернуться к курсу
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{mt: 4}}>
            <Typography variant="h4" align="center" gutterBottom>
                Прохождение теста
            </Typography>
            <List>
                {questions.map((question) => (
                    <Paper key={question.id} elevation={3} sx={{mb: 3, p: 2, borderRadius: 2}}>
                        <ListItem>
                            <ListItemText
                                primary={question.text}
                                primaryTypographyProps={{fontWeight: 'medium'}}
                            />
                        </ListItem>
                        <RadioGroup
                            value={answers[question.id] || ''}
                            onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                        >
                            {question.answers.map((answer) => (
                                <FormControlLabel
                                    key={answer.id}
                                    value={answer.id}
                                    control={<Radio/>}
                                    label={answer.text}
                                />
                            ))}
                        </RadioGroup>
                    </Paper>
                ))}
            </List>
            <Box display="flex" justifyContent="center" mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length !== questions.length}
                >
                    Завершить тест
                </Button>
            </Box>
        </Container>
    );
};

export default TestScreen;