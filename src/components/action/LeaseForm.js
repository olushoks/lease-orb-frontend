const LeaseForm = (props) => {
  const { location, handleChange, handleSubmit, message } = props;

  return (
    <>
      <div style={{ marginTop: "3rem" }}>
        <p>Enter Lease Details as accurately as possible</p>
        <p>{message}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="propertyName">Apartment Name</label>
        <input
          type="text"
          name="name"
          value={location.name}
          onChange={handleChange}
          // required
        ></input>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          value={location.address}
          onChange={handleChange}
          readOnly
          // required
        ></input>
        <label htmlFor="monthly-rent">Rent Per Month</label>
        <input
          type="number"
          min="0"
          step="500"
          name="rent"
          // required
          onChange={handleChange}
        ></input>
        <label htmlFor="available-date">Available as of?</label>
        <input
          type="date"
          name="availableDate"
          min="2021-04-25"
          max="2021-08-31"
          value={location.availableDate}
          // required
          onChange={handleChange}
        ></input>
        <label htmlFor="additional-info">Additional Information</label>
        <textarea
          name="additionalInfo"
          value={location.additionalInfo}
          onChange={handleChange}
        ></textarea>
        <button className="btn">Submit</button>
      </form>
    </>
  );
};

export default LeaseForm;
