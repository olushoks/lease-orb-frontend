import { useState } from "react";
import DisplayReviews from "../reviews/DisplayReviews";

const AddForm = ({ closeForm, user }) => {
  const clickStar = (num) => {
    let updatedStarRating = [];
    for (let i = 0; i < 5; i++) {
      i < num
        ? updatedStarRating.push(
            <i
              className="fas fa-star"
              key={i + 1}
              style={{ color: "gold" }}
              onClick={() => clickStar(i + 1)}
            ></i>
          )
        : updatedStarRating.push(
            <i
              className="fas fa-star"
              key={i + 1}
              style={{ color: "gray" }}
              onClick={() => clickStar(i + 1)}
            ></i>
          );
    }
    setStarRatings([...updatedStarRating]);
    setReviewDetails({ ...reviewDetails, star_rating: num });
  };

  const stars = [
    <i
      className="fas fa-star"
      key={1}
      style={{ color: "gray" }}
      onClick={() => clickStar(1)}
    ></i>,
    <i
      className="fas fa-star"
      key={2}
      style={{ color: "gray" }}
      onClick={() => clickStar(2)}
    ></i>,
    <i
      className="fas fa-star"
      key={3}
      style={{ color: "gray" }}
      onClick={() => clickStar(3)}
    ></i>,
    <i
      className="fas fa-star"
      key={4}
      style={{ color: "gray" }}
      onClick={() => clickStar(4)}
    ></i>,
    <i
      className="fas fa-star"
      key={5}
      style={{ color: "gray" }}
      onClick={() => clickStar(5)}
    ></i>,
  ];

  const [error, setError] = useState("");
  const [starRatings, setStarRatings] = useState(stars);
  const [reviewDetails, setReviewDetails] = useState({
    review_text: "",
    star_rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewDetails({ ...reviewDetails, [name]: value });
  };

  const submitReview = (e) => {
    e.preventDefault();
    const { review_text, star_rating } = reviewDetails;
    if (!review_text && !star_rating) {
      setError(`Empty Values`);
      setTimeout(() => setError(""), 2000);
    }
    if (!review_text && star_rating) {
      setError(`Enter review before submitting`);
      setTimeout(() => setError(""), 2000);
    }
    if (!star_rating && review_text) {
      setError(`click on the stars to give a rating`);
      setTimeout(() => setError(""), 2000);
    }
    if (review_text && star_rating) {
      console.log(reviewDetails);
      setReviewDetails({ review_text: "", star_rating: null });
      setStarRatings(stars);
    }
  };

  return (
    <>
      <span onClick={closeForm}>
        <i className="fas fa-window-close"></i>
      </span>
      <p>{error}</p>
      {starRatings}
      <form onSubmit={submitReview}>
        <textarea
          name="review_text"
          value={reviewDetails.review_text}
          onChange={handleChange}
        ></textarea>
        <button>Submit Review</button>
      </form>
      <hr></hr>
      <div>{<DisplayReviews />}</div>
    </>
  );
};

export default AddForm;
