import { useState } from "react";
import axios from "axios";
import "./App.css";
import LogIn from "./components/log-in/LogIn";
import Header from "./components/header/Header";

const App = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = async (action, userCredentials) => {
    const route =
      action === "login"
        ? "http://localhost:5000/api/auth/sign-in"
        : "http://localhost:5000/api/users/sign-up";

    console.log(route);

    await axios
      .post(route, userCredentials)
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data);
          console.log(res.data);
          console.log(res.status);
        }
        console.log(user);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {isLoggedIn || <LogIn auth={authenticateUser} />}
      {isLoggedIn && <Header />}
    </div>
  );
};

export default App;
