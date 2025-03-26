import React from 'react';
import Star from './Star.jsx';

const StarRating = ({ crimeRate }) => {
  const totalStars = 5; // Assuming a 5-star rating system
  const filledStars = Math.round(crimeRate); // Round the crimeRate to the nearest integer

  return (
    <div className="inline-flex items-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star key={index} filled={index < filledStars} />
      ))}
    </div>
  );
};

export default StarRating;
