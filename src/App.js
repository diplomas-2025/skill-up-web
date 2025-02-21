import './App.css';
import {AuthScreen} from "./pages/AuthPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {RegistrationScreen} from "./pages/RegistrationPage";
import {MainPage} from "./pages/MainPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                { localStorage.getItem("token") ?
                    <>
                        <Route path="/" element={<MainPage/>}/>

                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                    :
                    <>
                        <Route path="/login" element={<AuthScreen/>}/>
                        <Route path="/register" element={<RegistrationScreen/>}/>

                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
