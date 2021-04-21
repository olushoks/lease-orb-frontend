import { useState } from "react";
import axios from "axios";
import "./App.css";
import LogIn from "./components/log-in/LogIn";
import HomePage from "./components/HomePage";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = async (action, userCredentials) => {
    const route =
      action === "login"
        ? "http://localhost:5000/api/auth/sign-in"
        : "http://localhost:5000/api/users/sign-up";

    await axios
      .post(route, userCredentials)
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {isLoggedIn || <LogIn auth={authenticateUser} />}
      {isLoggedIn && <HomePage user={user} />}
    </>
  );
};

export default App;
