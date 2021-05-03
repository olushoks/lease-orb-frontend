import axios from "axios";
import { useState } from "react";

const InterestedIn = ({ user, closeNav, withdrawInterest }) => {
  const [leaseInterestedIn, setLeaseInterestedIn] = useState(
    user.leaseInterestedIn
  );

  if (!leaseInterestedIn) return null;

  if (leaseInterestedIn.length === 0)
    return (
      <div>
        <span onClick={closeNav}>
          <i className="fas fa-window-close"></i>
        </span>
        <p>You have not indicated interest in any lease</p>
      </div>
    );

  const withdrawInterestInLease = async (lease) => {
    await axios
      .delete(
        `http://localhost:5000/api/users/${user.username}/withdraw-interest/${lease._id}`
      )
      .then((res) => {
        setLeaseInterestedIn([]); // Remove from UI
        withdrawInterest(res.data); // Remove from Database
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <span onClick={closeNav}>
        <i className="fas fa-window-close"></i>
      </span>
      {leaseInterestedIn.map((lease) => {
        return (
          <div key={lease._id}>
            <p>
              {lease.name} posted by {lease.postedBy}
            </p>
            <p>{lease.address}</p>
            <p>
              Listed on {lease.dateListed} | Available on {lease.availableDate}
            </p>
            <p>Currently leasing for ${lease.rent} per month</p>
            <p>{lease.additionalInfo}</p>
            <button onClick={() => withdrawInterestInLease(lease)}>
              Withdraw Interest
            </button>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default InterestedIn;
