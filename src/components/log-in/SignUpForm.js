import "./LogIn.css";

const SignUpForm = (props) => {
  const {
    username,
    password,
    toggleDisplay,
    handleChange,
    handleSubmit,
    error,
  } = props;

  return (
    <div className="form-div">
      <p>{error}</p>
      <form className="form-input" onSubmit={(e) => handleSubmit(e)}>
        <input
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
