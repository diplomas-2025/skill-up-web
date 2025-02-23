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
    console.log(answers)
    const response = await axios.post(`${BASE_URL}/api/tests/${id}/submit`, answers, {
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
async function getTestResults(testId) {
    const response = await axios.get(`${BASE_URL}/api/progress/test-results/by-test-id/${testId}`, {
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

export async function getLecturesByCourseId(id) {
    const response = await axios.get(`${BASE_URL}/api/lessons?courseId=${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

export async function getTestsByCourseId(id) {
    const response = await axios.get(`${BASE_URL}/api/tests?courseId=${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

export async function getUserInfo() {
    const response = await axios.get(`${BASE_URL}/api/users/me`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
}

export async function getTestResult(courseId) {
    return (await axios.get(`${BASE_URL}/api/progress/test-results/course?courseId=${courseId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })).data
}

export async function getUserTestResult() {
    return (await axios.get(`${BASE_URL}/api/progress/test-results`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })).data
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