import "./LogIn.css";
import { useEffect, useRef } from "react";

const LogInForm = (props) => {
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
          placeholder="username"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Login
        </button>
        <p className="guide-text">
          New user?
          <span onClick={() => toggleDisplay("createAccount")}>
            Create Account
          </span>
        </p>
      </form>
    </div>
  );
};

export default LogInForm;
