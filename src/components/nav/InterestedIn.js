const InterestedIn = ({ user, closeNav }) => {
  const leaseInterestedIn = user.leaseInterestedIn;

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

            <br></br>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default InterestedIn;
