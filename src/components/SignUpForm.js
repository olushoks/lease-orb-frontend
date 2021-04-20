const SignUpForm = (props) => {
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
      </form>
      <p className="guide-text">
        Already a user?
        <span onClick={() => toggleDisplay("login")}>Login</span>
      </p>
    </div>
  );
};

export default SignUpForm;
