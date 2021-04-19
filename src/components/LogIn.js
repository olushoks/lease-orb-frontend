import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

const LogIn = () => {
  const [displayLogIn, setDisplayLogIn] = useState(true);
  const [displayCreateAccount, setDisplayCreateAccount] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      {displayLogIn && (
        <LogInForm
          username={userCredentials.username}
          password={userCredentials.password}
          handleChange={console.log("Change")}
          handleSubmit={console.log("Submit")}
        />
      )}
      {displayCreateAccount && (
        <SignUpForm
          username={userCredentials.username}
          password={userCredentials.password}
          handleChange={console.log("Change")}
          handleSubmit={console.log("Submit")}
        />
      )}
    </>
  );
};

export default LogIn;
