import React from 'react';
import Tag from 'react-bulma-components/lib/components/tag';
import './Card.css';

const Card = props => {
  const cardPreviewImages = props.images.map((image, index) => {
    return (
      <img
        className="image-preview"
        key={index.toString()}
        src={image.location}
        alt={image.alt}/>
    );
  });
  return (
    <div className="thumbnails">
      <div className="image-previews-container">{cardPreviewImages}</div>
      <Tag rounded size="large" className="nomenclature-image-count">
        {props.imageCount}
      </Tag>
     
      <div className="thumbnail">
        <img src={props.src} alt={props.alt}/>
      </div>
    </div>
  );
};

export default Card;
