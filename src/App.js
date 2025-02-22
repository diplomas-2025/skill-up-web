import './App.css';
import {AuthScreen} from "./pages/AuthPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {RegistrationScreen} from "./pages/RegistrationPage";
import {MainPage} from "./pages/MainPage";
import CourseDetail from "./pages/CourseDetail";
import TestScreen from "./pages/TestPage";
import CreateCourse from "./pages/CreateCourse";
import CreateLecture from "./pages/CreateLecture";
import Header from "./pages/Header";
import {LessonPage} from "./pages/LessonPage";

function App() {
    return (
        <BrowserRouter>
            {localStorage.getItem("token") &&
                <Header/>
            }
            <Routes>
                {localStorage.getItem("token") ?
                    <>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/course/:courseId" element={<CourseDetail/>}/>
                        <Route path="/test/:testId" element={<TestScreen/>}/>
                        <Route path="/create-course" element={<CreateCourse/>}/>
                        <Route path="/course/:courseId/create-lecture" element={<CreateLecture/>}/>
                        <Route path="/lesson/:lessonId" element={<LessonPage/>}/>

                        <Route path="*" element={<Navigate to="/"/>}/>
                    </>
                    :
                    <>
                        <Route path="/login" element={<AuthScreen/>}/>
                        <Route path="/register" element={<RegistrationScreen/>}/>

                        <Route path="*" element={<Navigate to="/login"/>}/>
                    </>
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
