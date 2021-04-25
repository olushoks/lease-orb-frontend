import "./Main.css";
//import Map from "../map/Map";
import LeaseForm from "../action/LeaseForm";
import { useState } from "react";

const Main = ({ user }) => {
  const [showActionBtn, setShowActionBtn] = useState(true);
  const [action, setAction] = useState(null);

  const handleClick = (action) => {
    switch (action) {
      case "listALease":
        setAction(true);
        setShowActionBtn(false);
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
        </>
      )}
      {/* <Map /> */}
      {action && <LeaseForm />}
    </div>
  );
};

export default Main;
