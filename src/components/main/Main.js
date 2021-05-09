import "./Main.css";
import ListLease from "../action/ListLease";
import SearchLease from "../action/SearchLease";
import AddReview from "../action/AddReview";
import { useState } from "react";

const Main = ({ user, submitLease, indicateInterest }) => {
  const [showActionBtn, setShowActionBtn] = useState(true);
  const [listLease, setListLease] = useState(false);
  const [leaseSearch, setLeaseSearch] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [error, setError] = useState(null);

  const closeForm = () => {
    setShowActionBtn(true);
    setListLease(false);
    setLeaseSearch(false);
    setReviews(false);
  };

  // IF USER ALREADY HAS AN ACTIVE LEASE, PREVENT FROM ADDING ANOTHER ONE
  const checkForActiveLease = () => {
    if (user.listedLease.length !== 0) {
      setError(
        "You are not allowed to have more than one active lease! Go to your ListedLease to delete to continue"
      );
      setTimeout(clearError, 3000);
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
        setReviews(true);
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
          <p>Welcome {user.username}, what would you like to do today?</p>
          <div>{error}</div>
          <button className="btn" onClick={() => handleClick("listALease")}>
            List A Lease
          </button>
          <button className="btn" onClick={() => handleClick("searchLease")}>
            Search Available Leases
          </button>
          <button className="btn" onClick={() => handleClick("reviews")}>
            REVIEWS
          </button>
        </>
      )}
      {listLease && (
        <ListLease closeForm={closeForm} submitLease={submitLease} />
      )}
      {leaseSearch && (
        <SearchLease
          closeForm={closeForm}
          user={user}
          indicateInterest={indicateInterest}
        />
      )}
      {reviews && <AddReview closeForm={closeForm} />}
    </div>
  );
};

export default Main;
