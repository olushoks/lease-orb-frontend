import { useState } from "react";

const ListedLease = ({ user, closeNav }) => {
  // const [listedLease] = user.listedLease;

  const [listedLease, setListedLease] = useState(user.listedLease);
  // if (user.listedLease.length > 1) return null;

  const deleteLease = () => {
    console.log("delete");
    setListedLease([]);
  };

  if (!listedLease || listedLease.length < 1) {
    return (
      <>
        <span onClick={closeNav}>
          <i className="fas fa-window-close"></i>
        </span>
        <p>You do not have any listed lease</p>
      </>
    );
  }

  return (
    <>
      <span onClick={closeNav}>
        <i className="fas fa-window-close"></i>
      </span>
      {listedLease.map((listedLease) => {
        return (
          <div key={listedLease._id}>
            <p>
              {listedLease.name} posted on {listedLease.dateListed}
            </p>
            <p>{listedLease.address}</p>
            <p>Currently leasing for ${listedLease.rent}</p>
            <p>
              Available Date:
              {listedLease.availableDate}
            </p>
            <p>Additional Info: {listedLease.additionalInfo}</p>
            <button onClick={deleteLease}>Delete Lease</button>
          </div>
        );
      })}
    </>
  );
};

export default ListedLease;
