const ListedLease = ({ user }) => {
  const [listedLease] = user.listedLease;
  return (
    <div>
      <span>
        <i class="fas fa-window-close"></i>
      </span>
      <p>Name: {listedLease.name}</p>
      <p>Rent Per Month: ${listedLease.rentPerMonth}</p>
      <p>Type: {listedLease.apartmentType}</p>
      <p>
        Available Date:
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
