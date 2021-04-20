import "./LogIn.css";

const LogInForm = (props) => {
  const {
    username,
    password,
    toggleDisplay,
    handleChange,
    handleSubmit,
  } = props;
  return (
    <div className="form-div">
      <form className="form-input" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleChange}
        ></input>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p className="guide-text">
        New user?
        <span onClick={() => toggleDisplay("createAccount")}>
          Create Account
        </span>
      </p>
    </div>
  );
};

export default LogInForm;
