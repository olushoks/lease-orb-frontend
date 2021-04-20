const Main = ({ username }) => {
  return (
    <>
      <p>Welcome {username}, what would you like to do today?</p>
      <button>List A Lease</button>
      <button>Search Available Leases</button>
    </>
  );
};

export default Main;
