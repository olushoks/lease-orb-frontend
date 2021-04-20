import Header from "./header/Header";
import Main from "./main/Main";

const HomePage = ({ user }) => {
  const { username } = user;
  return (
    <>
      <Header />
      <Main username={username} />
    </>
  );
};

export default HomePage;
