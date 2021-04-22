const InterestedIn = ({ user }) => {
  const leaseInterestedIn = user.leaseInterestedIn;
  return (
    <>
      <span>
        <i class="fas fa-window-close"></i>
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
    </>
  );
};

export default InterestedIn;
