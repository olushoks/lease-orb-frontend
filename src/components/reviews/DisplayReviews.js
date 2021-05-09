import axios from "axios";
import { useEffect, useState } from "react";
import getDate from "../../helper/getDateFromDateTime";

const DisplayReviews = () => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    // FETCH REVIEWS
    const fetchReviews = async () => {
      axios.get("http://localhost:5000/api/reviews").then(({ data }) => {
        setReviews(data);
      });
    };

    fetchReviews();
  }, []);

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
          <div key={review._id}>
            <div>{goldStars(review.star_rating)}</div>
            <p>{review.review_text}</p>
            <small>{review.review_by}</small>
            <small>{getDate(review.review_date)}</small>
          </div>
        );
      })}
    </section>
  );
};

export default DisplayReviews;
