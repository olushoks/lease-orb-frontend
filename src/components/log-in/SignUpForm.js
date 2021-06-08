import "./LogIn.css";
import { useRef, useEffect } from "react";

const SignUpForm = (props) => {
  const {
    username,
    password,
    toggleDisplay,
    handleChange,
    handleSubmit,
    error,
  } = props;

  const userNameRef = useRef(null);

  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  return (
    <div className="form-div">
      <p className="login-error">{error}</p>
      <form className="form-input" onSubmit={(e) => handleSubmit(e)}>
        <input
          ref={userNameRef}
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="username"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={handleChange}
        ></input>
        <button type="submit" className="btn">
          Create Account
        </button>
        <p className="guide-text">
          Already a user?
          <span onClick={() => toggleDisplay("login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
