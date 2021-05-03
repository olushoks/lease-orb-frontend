import Header from "./header/Header";
import Main from "./main/Main";

const HomePage = (props) => {
  const {
    user,
    submitLease,
    logOut,
    deleteLeaseFromDataBase,
    indicateInterest,
  } = props;

  if (!user) return null;

  if (user) {
    return (
      <>
        <Header
          user={user}
          logOut={logOut}
          deleteLeaseFromDataBase={deleteLeaseFromDataBase}
        />
        <Main
          user={user}
          submitLease={submitLease}
          indicateInterest={indicateInterest}
        />
      </>
    );
  }
};

export default HomePage;
