import Header from "../header/Header";
import Main from "../main/Main";
import "./HomePage.css";

const HomePage = (props) => {
  const {
    user,
    submitLease,
    logOut,
    deleteLeaseFromDataBase,
    indicateInterest,
    withdrawInterest,
    replyMessage,
    addReview,
    reviews,
  } = props;

  if (!user) return null;

  if (user) {
    return (
      <div className="home-page">
        <Header
          user={user}
          logOut={logOut}
          deleteLeaseFromDataBase={deleteLeaseFromDataBase}
          withdrawInterest={withdrawInterest}
          replyMessage={replyMessage}
        />
        <Main
          user={user}
          submitLease={submitLease}
          indicateInterest={indicateInterest}
          addReview={addReview}
          reviews={reviews}
        />
      </div>
    );
  }
};

export default HomePage;
