import "./Main.css";
// import MapWithAutoComplete from "../map/Map";
import ListLease from "../action/ListLease";
import { useState } from "react";

const Main = ({ user }) => {
  const [showActionBtn, setShowActionBtn] = useState(true);
  const [action, setAction] = useState(null);
  const [error, setError] = useState(null);

  const closeForm = () => {
    setShowActionBtn(true);
    setAction(null);
  };

  const checkForActiveLease = () => {
    if (user.listedLease.length !== 0) {
      setError(
        "You are not allowed to have more than one active leases! Go to your ListedLease to either edit or delete to continue"
      );
    } else {
      setAction(true);
      setShowActionBtn(false);
    }
  };

  const handleClick = (action) => {
    switch (action) {
      case "listALease":
        checkForActiveLease();
        // setAction(true);
        // setShowActionBtn(false);
        break;
      case "searchLease":
        setAction(true);
        setShowActionBtn(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="main">
      <p>Welcome {user.username}, what would you like to do today?</p>
      {showActionBtn && (
        <>
          <button className="btn" onClick={() => handleClick("listALease")}>
            List A Lease
          </button>
          <button className="btn" onClick={() => handleClick("searchLease")}>
            Search Available Leases
          </button>
          {<div>{error}</div>}
        </>
      )}
      {action && <ListLease closeForm={closeForm} />}
      {/* {action && <MapWithAutoComplete closeForm={closeForm} />} */}
    </div>
  );
};

export default Main;
