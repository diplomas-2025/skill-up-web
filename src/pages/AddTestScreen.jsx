import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {addTest} from "../api/api";
import {useNavigate, useParams} from "react-router-dom";

const AddTestScreen = () => {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        {
            questionText: '',
            answers: [{ answerText: '', isCorrect: false }],
        },
    ]);

    // Обработчик изменения названия теста
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Обработчик изменения текста вопроса
    const handleQuestionTextChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = e.target.value;
        setQuestions(newQuestions);
    };

    // Обработчик изменения текста ответа
    const handleAnswerTextChange = (questionIndex, answerIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers[answerIndex].answerText = e.target.value;
        setQuestions(newQuestions);
    };

    // Обработчик изменения правильного ответа
    const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.forEach((answer, idx) => {
            answer.isCorrect = idx === answerIndex;
        });
        setQuestions(newQuestions);
    };

    // Добавление нового вопроса
    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                questionText: '',
                answers: [{ answerText: '', isCorrect: false }],
            },
        ]);
    };

    // Добавление нового ответа к вопросу
    const addAnswer = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.push({ answerText: '', isCorrect: false });
        setQuestions(newQuestions);
    };

    // Удаление ответа
    const removeAnswer = (questionIndex, answerIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.splice(answerIndex, 1);
        setQuestions(newQuestions);
    };

    // Удаление вопроса
    const removeQuestion = (questionIndex) => {
        const newQuestions = questions.filter((_, idx) => idx !== questionIndex);
        setQuestions(newQuestions);
    };

    // Отправка формы
    const handleSubmit = (e) => {
        e.preventDefault();
        addTest(courseId, title, questions).then(r => {
            navigate('/course/' + courseId)
        })
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Добавление теста к курсу
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Название теста"
                    value={title}
                    onChange={handleTitleChange}
                    sx={{ mb: 3 }}
                />

                {questions.map((question, questionIndex) => (
                    <Card key={questionIndex} sx={{ mb: 3 }}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={10}>
                                    <TextField
                                        fullWidth
                                        label={`Вопрос ${questionIndex + 1}`}
                                        value={question.questionText}
                                        onChange={(e) => handleQuestionTextChange(questionIndex, e)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        color="error"
                                        onClick={() => removeQuestion(questionIndex)}
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            {question.answers.map((answer, answerIndex) => (
                                <Grid container spacing={2} alignItems="center" key={answerIndex} sx={{ mt: 2 }}>
                                    <Grid item xs={8}>
                                        <TextField
                                            fullWidth
                                            label={`Ответ ${answerIndex + 1}`}
                                            value={answer.answerText}
                                            onChange={(e) => handleAnswerTextChange(questionIndex, answerIndex, e)}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={answer.isCorrect}
                                                    onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)}
                                                />
                                            }
                                            label="Правильный"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton
                                            color="error"
                                            onClick={() => removeAnswer(questionIndex, answerIndex)}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}

                            <Button
                                variant="outlined"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={() => addAnswer(questionIndex)}
                                sx={{ mt: 2 }}
                            >
                                Добавить ответ
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={addQuestion}
                    sx={{ mb: 3 }}
                >
                    Добавить вопрос
                </Button>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Сохранить тест
                </Button>
            </form>
        </Container>
    );
};

export default AddTestScreen;