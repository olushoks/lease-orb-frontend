const ListedLease = ({ user, closeNav }) => {
  if (user.listedLease > 1) return null;

  const [listedLease] = user.listedLease;

  return (
    <div>
      <span onClick={closeNav}>
        <i className="fas fa-window-close"></i>
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
