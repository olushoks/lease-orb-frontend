const ListedLease = ({ user }) => {
  const [listedLease] = user.listedLease;
  return (
    <div>
      <p>
        Name: {listedLease.name} | Rent Per Month: ${listedLease.rentPerMonth}
      </p>
      <p>
        Type: {listedLease.apartmentType} | Available Date:
        {listedLease.availableDate}
      </p>
      <p>
        City: {listedLease.city} | State: {listedLease.state} | ZipCode:
        {listedLease.zipCode}
      </p>
      <p>Additional Info: {listedLease.additionalInfo}</p>
    </div>
  );
};

export default ListedLease;
