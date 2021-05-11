import { useState } from "react";
import DisplayReviews from "../reviews/DisplayReviews";

import "../reviews/DisplayReviews.css";
import "./AddReview.css";

const AddForm = ({ closeForm, addReview, reviews, user }) => {
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
    review_by: user.username,
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
      setError(`You cannot submit empty values`);
      setTimeout(() => setError(""), 2000);
    } else if (!review_text && star_rating) {
      setError(`Enter review before submitting`);
      setTimeout(() => setError(""), 2000);
    } else if (!star_rating && review_text) {
      setError(`click on the stars to give a rating`);
      setTimeout(() => setError(""), 2000);
    } else {
      console.log(reviewDetails);
      setReviewDetails({ review_text: "", star_rating: 0 });
      setStarRatings(stars);
      addReview(reviewDetails);
    }
  };

  return (
    <div className="review">
      <span className="close-reviews" onClick={closeForm}>
        <i className="fas fa-window-close"></i>
      </span>
      <div className="review-form">
        <p className="review-error">{error}</p>
        {starRatings}
        <form onSubmit={submitReview}>
          <textarea
            name="review_text"
            value={reviewDetails.review_text}
            className="text-box"
            onChange={handleChange}
          ></textarea>
          <button className="review-submit-btn">Submit Review</button>
        </form>
      </div>
      <hr></hr>
      <div>{<DisplayReviews reviews={reviews} />}</div>
    </div>
  );
};

export default AddForm;
