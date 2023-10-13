import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavigationBar/NavBar";
import RegistrationPage from "./components/Registration/RegistrationPage";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";


function App() {
  return (
    <>
      <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/createacc" element={<RegistrationPage />} />
        </Routes>
        <Routes>
          <Route path="/myaccount" element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
