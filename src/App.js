import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Login from "./routes/authentication/login.component";
import Profile from "./routes/profile/profile";
import Chatbot from "./routes/chatbot/chatbot";
import PageNotFound from "./routes/404/pagenotfound";
import SignUp from "./routes/authentication/signup.component";
import { fetchUser } from "./utils/firebase/firebase.utils";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="*" element={<PageNotFound />} />
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Login />} />
        <Route path="profile" element={<Profile />}>
          <Route path="setting" element={<h1>Setting</h1>} />
        </Route>
        <Route path="chat" element={<Chatbot />} />
      </Route>
    </Routes>
  );
};

export default App;
