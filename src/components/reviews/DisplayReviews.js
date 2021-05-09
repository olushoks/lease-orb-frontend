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

  // // STARS
  // const stars = Array(5).fill(<i className="far fa-star"></i>);

  const goldStars = (rating) => {
    let startRatings = [];

    for (let i = 0; i < 5; i++) {
      i < rating
        ? startRatings.push(
            <i className="fas fa-star" style={{ color: "gold" }}></i>
          )
        : startRatings.push(
            <i className="fas fa-star" style={{ color: "gray" }}></i>
          );
    }

    return startRatings;
  };

  if (!reviews) return <p>No reviews!</p>;

  return (
    <section>
      {reviews.map((review) => {
        return (
          <div key={review._id}>
            <div>{goldStars(3)}</div>
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
