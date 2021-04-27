import Header from "./header/Header";
import Main from "./main/Main";

const HomePage = ({ user, submitLease, logOut }) => {
  if (!user) return null;

  if (user) {
    return (
      <>
        <Header user={user} logOut={logOut} />
        <Main user={user} submitLease={submitLease} />
      </>
    );
  }
};

export default HomePage;
