import "./Main.css";
import ListLease from "../action/ListLease";
import SearchLease from "../action/SearchLease";
import { useState } from "react";

const Main = ({ user, submitLease }) => {
  const [showActionBtn, setShowActionBtn] = useState(true);
  const [listLease, setListLease] = useState(false);
  const [leaseSearch, setLeaseSearch] = useState(false);
  const [error, setError] = useState(null);

  const closeForm = () => {
    setShowActionBtn(true);
    setListLease(false);
    setLeaseSearch(false);
  };

  // IF USER ALREADY HAS AN ACTIVE LEASE, PREVENT FROM ADDING ANOTHER ONE
  const checkForActiveLease = () => {
    if (user.listedLease.length !== 0) {
      setError(
        "You are not allowed to have more than one active lease! Go to your ListedLease to either edit or delete to continue"
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
        // setAction(true);
        // setShowActionBtn(false);
        break;
      case "searchLease":
        setLeaseSearch(true);
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
          <button className="btn" onClick={() => handleClick("listALease")}>
            List A Lease
          </button>
          <button className="btn" onClick={() => handleClick("searchLease")}>
            Search Available Leases
          </button>
          {<div>{error}</div>}
        </>
      )}
      {listLease && (
        <ListLease closeForm={closeForm} submitLease={submitLease} />
      )}
      {leaseSearch && <SearchLease closeForm={closeForm} user={user} />}
    </div>
  );
};

export default Main;
