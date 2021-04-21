const InterestedIn = ({ user }) => {
  const leaseInterestedIn = user.leaseInterestedIn;
  return leaseInterestedIn.map((lease) => {
    <div>
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
    </div>;
  });
};

export default InterestedIn;
