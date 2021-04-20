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

  return (
    <>
      {displayLogIn && (
        <LogInForm
          username={userCredentials.username}
          password={userCredentials.password}
          toggleDisplay={toggleDisplay}
          handleChange={console.log("Change")}
          handleSubmit={console.log("Submit")}
        />
      )}
      {displayCreateAccount && (
        <SignUpForm
          username={userCredentials.username}
          password={userCredentials.password}
          toggleDisplay={toggleDisplay}
          handleChange={console.log("Change")}
          handleSubmit={console.log("Submit")}
        />
      )}
    </>
  );
};

export default LogIn;
