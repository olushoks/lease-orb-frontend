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
            <p>Name: {lease.name}</p>
            <p>Rent Per Month: ${lease.rentPerMonth}</p>
            <p>Type: {lease.apartmentType}</p>
            <p>
              Available Date:
              {lease.availableDate}
            </p>
            <p>
              City: {lease.city} | State: {lease.state} | ZipCode:
              {lease.zipCode}
            </p>
            <p>Additional Info: {lease.additionalInfo}</p>
            <br></br>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default InterestedIn;
