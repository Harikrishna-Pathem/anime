import React, { useRef } from "react";
import "./Reviews.css";
import reviews_image from "../../images/reviews_image.jpg";

const Reviews = () => {
  const scrollRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Alex Tanaka",
      rating: 5,
      comment: "Absolutely amazing quality! The figures look just like in the anime.",
      image: reviews_image,
    },
    {
      id: 2,
      name: "Maya Chen",
      rating: 5,
      comment: "Superb figurines! Fast delivery and great packaging.",
      image: reviews_image,
    },
    {
      id: 3,
      name: "Ravi Kumar",
      rating: 4,
      comment: "Great detail and craftsmanship, highly recommend this store!",
      image: reviews_image,
    },
    {
      id: 4,
      name: "Emma Johnson",
      rating: 5,
      comment: "These are the best anime figures I’ve ever bought!",
      image: reviews_image,
    },
  ];

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = current.offsetWidth * 0.8;
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">What Our Fans Say</h2>
      <p className="reviews-subtitle">Join thousands of fans who trust TheDojos</p>

      {/* <div className="reviews-scroll-buttons">
        <button onClick={() => scroll("left")}>&lt;</button>
        <button onClick={() => scroll("right")}>&gt;</button>
      </div> */}

      <div className="reviews-list" ref={scrollRef}>
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <img src={review.image} alt={review.name} className="review-image" />
            <h3>{review.name}</h3>
            <div className="review-stars">{"⭐".repeat(review.rating)}</div>
            <p className="review-comment">“{review.comment}”</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
