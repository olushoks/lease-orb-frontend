import axios from "axios";
import { useState } from "react";
import getDate from "../../helper/getDateFromDateTime";

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
    console.log(lease._id);
    await axios
      .delete(
        `http://localhost:5000/api/users/${user.username}/withdraw-interest/${lease._id}`
      )
      .then((res) => {
        setLeaseInterestedIn((leaseInterestedIn) => {
          // eslint-disable-next-line array-callback-return
          const updatedLeases = leaseInterestedIn.filter((leaseToRemove) => {
            if (lease._id !== leaseToRemove._id) return true;
          });
          return updatedLeases;
        }); // Remove from UI
        withdrawInterest(res.data); // Remove from Database
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
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
              Listed on {getDate(lease.dateListed)} | Available on
              {getDate(lease.availableDate)}
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
