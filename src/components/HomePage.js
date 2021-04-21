import Header from "./header/Header";
import Main from "./main/Main";

const HomePage = ({ user }) => {
  if (!user) return null;

  if (user) {
    return (
      <>
        <Header user={user} />
        <Main user={user} />
      </>
    );
  }
};

export default HomePage;
