import "./DisplayReviews.css";
import getDate from "../../helper/getDateFromDateTime";

const DisplayReviews = ({ reviews }) => {
  // STARS
  const goldStars = (rating) => {
    let starRatings = [];

    for (let i = 0; i < 5; i++) {
      i < rating
        ? starRatings.push(
            <i
              className="fas fa-star"
              key={i + 1}
              style={{ color: "gold" }}
            ></i>
          )
        : starRatings.push(
            <i
              className="fas fa-star"
              key={i + 1}
              style={{ color: "gray" }}
            ></i>
          );
    }

    return starRatings;
  };

  if (!reviews) return <p>No reviews!</p>;

  return (
    <section>
      {reviews.map((review) => {
        return (
          <div key={review._id} className="review-section">
            <div>{goldStars(review.star_rating)}</div>
            <blockquote>
              {/* <i className="fas fa-quote-left"></i> */}
              {review.review_text}
              {/* <i className="fas fa-quote-right"></i> */}
            </blockquote>
            <small className="review-by-date">
              {review.review_by} | {getDate(review.review_date)}
            </small>
          </div>
        );
      })}
    </section>
  );
};

export default DisplayReviews;
