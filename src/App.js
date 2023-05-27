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
import { useState } from "react";
import { getAuth } from "firebase/auth";
import Dashboard from "./routes/dashboard/dashboard";
const App = () => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigation
            setCurrentUser={(user) => {
              console.log(user);
              setUser(user);
            }}
            user={user}
          />
        }
      >
        <Route path="*" element={<PageNotFound />} />
        <Route index element={<Home />} />
        <Route
          path="login"
          element={
            <Login
              setCurrentUser={(user) => {
                console.log(user);
                setUser(user);
              }}
            />
          }
        />
        <Route
          path="signup"
          element={
            <SignUp
              setCurrentUser={(user) => {
                console.log(user);
                setUser(user);
              }}
            />
          }
        />
        <Route path="dashboard" element={<Dashboard user={user} />} />
        <Route path="profile" element={<Profile user={user} />}>
          <Route path="setting" element={<h1>Setting</h1>} />
        </Route>
        <Route path="chat" element={<Chatbot user={user} />} />
      </Route>
    </Routes>
  );
};

export default App;
