const LeaseForm = () => {
  return (
    <>
      <div>
        <p>Enter Lease Details as accurately as possible</p>
        <p>Success or Error Messages goes here</p>
      </div>
      <form>
        <label id="property-name" htmlFor="property-name">
          Apartment Name
        </label>
        <input type="text" name="property-name" value="QVC HOMES"></input>
        <label id="address" htmlFor="address">
          Address
        </label>
        <input type="text" name="address" value="QVC HOMES"></input>
        <label id="monthly-rent" htmlFor="monthly-rent">
          Rent Per Month
        </label>
        <input type="number" name="rent"></input>
        <label id="available-date" htmlFor="available-date">
          Available as of?
        </label>
        <input type="date" name="property-name"></input>
        <label id="additional-info" htmlFor="additional-info">
          Additional Information
        </label>
        <input type="textarea" name="additional-info" value="QVC HOMES"></input>
      </form>
    </>
  );
};

export default LeaseForm;
