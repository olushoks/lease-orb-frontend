const SignUpForm = () => {
  return (
    <div className="form-div">
      <form className="form-input" onSubmit="">
        <input
          type="text"
          id="username"
          name="username"
          value=""
          placeholder="username"
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          value=""
          placeholder="password"
        ></input>
        <button type="submit" className="btn">
          Create Account
        </button>
      </form>
      <p className="guide-text">
        Already a user?
        <span onClick={() => console.log("")}>Login</span>
      </p>
    </div>
  );
};

export default SignUpForm;
