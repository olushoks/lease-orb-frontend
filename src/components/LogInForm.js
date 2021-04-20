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
      <form className="form-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="Password"
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
