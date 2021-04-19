import { useState } from "react";
import "./LogIn.css";

const LogInForm = () => {
  return (
    <div className="form-div">
      <form>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value=""
        ></input>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value=""
        ></input>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p className="guide-text">
        New user?
        <span onClick={() => console.log("")}>Create Account</span>
      </p>
    </div>
  );
};

export default LogInForm;
