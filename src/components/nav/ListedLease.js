import { useState } from "react";
import getDate from "../../helper/getDateFromDateTime";

import "./nav.css";

const ListedLease = (props) => {
  const { user, closeNav, deleteLeaseFromDataBase } = props;

  const [listedLease, setListedLease] = useState(user.listedLease);

  const deleteLease = () => {
    setListedLease([]); // Removes from UI
    deleteLeaseFromDataBase(); // Removes from Database
  };

  if (!listedLease || listedLease.length < 1) {
    return (
      <section>
        <div className="nav-current">
          <span onClick={closeNav}>
            <i className="fas fa-window-close close-btn"></i>
          </span>
          <p>You do not have any listed lease</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="nav-current">
        <span onClick={closeNav}>
          <i className="fas fa-window-close close-btn"></i>
        </span>
        {listedLease.map((listedLease) => {
          return (
            <div key={listedLease._id}>
              <p>
                {listedLease.name} posted on {getDate(listedLease.dateListed)}
              </p>
              <p>{listedLease.address}</p>
              <p>Currently leasing for ${listedLease.rent}</p>
              <p>{`Available Date: ${getDate(listedLease.availableDate)}`}</p>
              <p>Additional Info: {listedLease.additionalInfo}</p>
              <button
                className="delete-btn"
                style={{ right: "-50%" }}
                onClick={deleteLease}
              >
                Delete Lease
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ListedLease;
