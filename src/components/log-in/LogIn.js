import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import transformString from "../../helper/stringTransformer";

const LogIn = ({ auth, user, error }) => {
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
    let { name, value } = e.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { username, password } = userCredentials;

    if (username && password) {
      // TRIM SPACES & CONVERT USERNAME TO LOWERCASE
      username = transformString(username);

      auth(action, { username, password });
      setUserCredentials({ username: "", password: "" });
    }
  };

  return (
    <>
      <>
        {displayLogIn && (
          <LogInForm
            username={userCredentials.username}
            password={userCredentials.password}
            toggleDisplay={toggleDisplay}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
          />
        )}
        {displayCreateAccount && (
          <SignUpForm
            username={userCredentials.username}
            password={userCredentials.password}
            toggleDisplay={toggleDisplay}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
          />
        )}
      </>
    </>
  );
};

export default LogIn;
