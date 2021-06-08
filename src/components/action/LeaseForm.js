import "./ListLease.css";

const LeaseForm = (props) => {
  const {
    location: {
      nameRef,
      addressRef,
      rentRef,
      availableDateRef,
      additionalInfoRef,
    },
    handleSubmit,
    alert,
  } = props;

  return (
    <>
      <div style={{ marginTop: "3rem" }}>
        <p ref={alert}>Enter Lease Details as accurately as possible</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="propertyName">Apartment Name</label>
        <input type="text" ref={nameRef}></input>
        <label htmlFor="address">Address</label>
        <input type="text" ref={addressRef} readOnly></input>
        <label htmlFor="monthly-rent">Rent Per Month</label>
        <input type="number" min="0" step="50" ref={rentRef}></input>
        <label htmlFor="available-date">Available as of?</label>
        <input
          type="date"
          ref={availableDateRef}
          min="2021-04-25"
          max="2021-08-31"
        ></input>
        <label htmlFor="additional-info" name="additional-info">
          Additional Information
        </label>
        <textarea
          ref={additionalInfoRef}
          className="additional-info"
        ></textarea>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default LeaseForm;
