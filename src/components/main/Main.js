import "./Main.css";
//import Map from "../map/Map";
import LeaseForm from "../action/LeaseForm";

const Main = ({ user }) => {
  return (
    <div className="main">
      <p>Welcome {user.username}, what would you like to do today?</p>
      <button className="btn">List A Lease</button>
      <button className="btn">Search Available Leases</button>
      {/* <Map /> */}
      <LeaseForm />
    </div>
  );
};

export default Main;
