// Импортируем axios
import axios from 'axios';

// Базовый URL API
const BASE_URL = 'https://spotdiff.ru/edu-profi-api';

// Функция для регистрации нового пользователя
async function signUp(firstName, email, password) {
    const response = await axios.post(`${BASE_URL}/users/security/sign-up`, {
        firstName,
        email,
        password
    });
    return response.data;
}

// Функция для входа пользователя
async function signIn(email, password) {
    const response = await axios.post(`${BASE_URL}/users/security/sign-in`, {
        email,
        password
    });
    return response.data;
}

// Функция для отправки теста
async function submitTest(id, answers) {
    const response = await axios.post(`${BASE_URL}/api/tests/${id}/submit`, {
        answers
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Функция для создания урока
async function createLesson(title, content, courseId) {
    const response = await axios.post(`${BASE_URL}/api/lessons`, {
        title,
        content,
        courseId
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Функция для получения всех курсов
async function getAllCourses() {
    const response = await axios.get(`${BASE_URL}/api/courses`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Функция для создания курса
async function createCourse(title, description) {
    const response = await axios.post(`${BASE_URL}/api/courses`, {
        title,
        description
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Функция для получения информации о текущем пользователе
async function getCurrentUser() {
    const response = await axios.get(`${BASE_URL}/api/users/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Функция для получения вопросов теста
async function getTestQuestions(id) {
    const response = await axios.get(`${BASE_URL}/api/tests/${id}/questions`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Функция для получения прогресса пользователя
async function getUserProgress(userId) {
    const response = await axios.get(`${BASE_URL}/api/progress/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Функция для получения результатов тестов пользователя
async function getTestResults(userId) {
    const response = await axios.get(`${BASE_URL}/api/progress/test-results/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Функция для получения урока по ID
async function getLessonById(id) {
    const response = await axios.get(`${BASE_URL}/api/lessons/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Функция для получения курса по ID
async function getCourseById(id) {
    const response = await axios.get(`${BASE_URL}/api/courses/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

// Экспортируем все функции для использования в других частях приложения
export {
    signUp,
    signIn,
    submitTest,
    createLesson,
    getAllCourses,
    createCourse,
    getCurrentUser,
    getTestQuestions,
    getUserProgress,
    getTestResults,
    getLessonById,
    getCourseById
};