const LeaseForm = ({ closeForm }) => {
  return (
    <>
      <span onClick={closeForm}>
        <i className="fas fa-window-close"></i>
      </span>
      <div>
        <p>Enter Lease Details as accurately as possible</p>
        <p>Success or Error Messages goes here</p>
      </div>
      <form>
        <label htmlFor="property-name">Apartment Name</label>
        <input
          type="text"
          id="property-name"
          name="property-name"
          value="QVC HOMES"
        ></input>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value="QVC HOMES"
        ></input>
        <label htmlFor="monthly-rent">Rent Per Month</label>
        <input
          type="number"
          min="0"
          step="50"
          id="monthly-rent"
          name="rent"
        ></input>
        <label htmlFor="available-date">Available as of?</label>
        <input
          type="date"
          id="available-date"
          name="property-name"
          min="2021-04-25"
          max="2021-08-31"
          //   value="2021-04-25"
        ></input>
        <label htmlFor="additional-info">Additional Information</label>
        <input
          type="textarea"
          id="additional-info"
          name="additional-info"
          value="QVC HOMES"
        ></input>
        <button className="btn">Submit</button>
      </form>
    </>
  );
};

export default LeaseForm;
