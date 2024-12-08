import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import NavBar from "./Components/NavBar";
import MyAccount from "./Components/MyAccount";
import EditProfile from "./Pages/EditProfile";
import UploadPost from "./Pages/UploadPost";
import SearchPage from "./Pages/SearchPage";

//if user is not signed in redirect to landing Page "/login" else stay in "/"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/UploadPost" element={<UploadPost />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
