import "./Main.css";
import ListLease from "../action/ListLease";
import SearchLease from "../action/SearchLease";
import AddReview from "../action/AddReview";
import { useState } from "react";

const Main = ({ user, submitLease, indicateInterest, addReview, reviews }) => {
  const [showActionBtn, setShowActionBtn] = useState(true);
  const [listLease, setListLease] = useState(false);
  const [leaseSearch, setLeaseSearch] = useState(false);
  const [showReviews, setshowReviews] = useState(false);
  const [error, setError] = useState(null);

  const closeForm = () => {
    setShowActionBtn(true);
    setListLease(false);
    setLeaseSearch(false);
    setshowReviews(false);
  };

  // IF USER ALREADY HAS AN ACTIVE LEASE, PREVENT FROM ADDING ANOTHER ONE
  const checkForActiveLease = () => {
    if (user.listedLease.length !== 0) {
      setError(
        "You are not allowed to have more than one active lease! To add another lease, delete currently listedLease"
      );
      setTimeout(clearError, 5000);
    } else {
      setListLease(true);
      setShowActionBtn(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const handleClick = (action) => {
    switch (action) {
      case "listALease":
        checkForActiveLease();
        break;
      case "searchLease":
        setLeaseSearch(true);
        setShowActionBtn(false);
        break;
      case "reviews":
        setshowReviews(true);
        setShowActionBtn(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="main">
      {showActionBtn && (
        <>
          <p className="greeting">
            Welcome <span className="user-name">{user.username}</span>, what
            would you like to do today?
          </p>
          <p className="error">{error}</p>
          <div>
            <button
              className="btn action"
              onClick={() => handleClick("listALease")}
            >
              List A Lease
            </button>
            <button
              className="btn action"
              onClick={() => handleClick("searchLease")}
            >
              Search All Leases
            </button>
            <button
              className="btn action"
              onClick={() => handleClick("reviews")}
            >
              REVIEWS
            </button>
          </div>
        </>
      )}
      {listLease && (
        <ListLease
          closeForm={closeForm}
          submitLease={submitLease}
          listedLease={user.listedLease}
        />
      )}
      {leaseSearch && (
        <SearchLease
          closeForm={closeForm}
          user={user}
          indicateInterest={indicateInterest}
        />
      )}
      {showReviews && (
        <AddReview
          closeForm={closeForm}
          addReview={addReview}
          user={user}
          reviews={reviews}
        />
      )}
    </div>
  );
};

export default Main;
