import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

const LogIn = () => {
  const [displayLogIn, setDisplayLogIn] = useState(true);
  const [displayCreateAccount, setDisplayCreateAccount] = useState(false);
  const [action, setAction] = useState("login");
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  // TOGGLE BETWEEN LOGIN AND SIGNUP
  const toggleDisplay = (view) => {
    switch (view) {
      case "createAccount":
        setDisplayLogIn(false);
        setDisplayCreateAccount(true);
        setAction("createAccount");
        break;
      case "login":
        setDisplayLogIn(true);
        setDisplayCreateAccount(false);
        setAction("login");
        break;
      default:
        break;
    }
    setUserCredentials({ username: "", password: "" });
  };

  //  GET USER INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (e) => {
    const { username, password } = userCredentials;
    e.preventDefault();
    if (username && password) {
      console.log(action, ":", userCredentials);
      setUserCredentials({ username: "", password: "" });
    }
  };

  return (
    <>
      {displayLogIn && (
        <LogInForm
          username={userCredentials.username}
          password={userCredentials.password}
          toggleDisplay={toggleDisplay}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
      {displayCreateAccount && (
        <SignUpForm
          username={userCredentials.username}
          password={userCredentials.password}
          toggleDisplay={toggleDisplay}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default LogIn;
