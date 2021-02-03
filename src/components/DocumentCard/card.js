import React from "react";
import Tag from "react-bulma-components/lib/components/tag";
import "./card.css";

const Card = (props) => {
  const cardPreviewImages = props.images.map((image, idx) => {
    return (
      <img
        className="image-preview"
        key={idx}
        src={image.file.src}
        alt={image.name}
      />
    );
  });
  return (
    <div className="thumbnails">
      <div className="image-previews-container">{cardPreviewImages}</div>
      <Tag rounded size="large" className="nomenclature-image-count">
        {props.imageCount}
      </Tag>

      <div className="thumbnail">
        <img src={props.src} alt={props.alt} />
      </div>
    </div>
  );
};

export default Card;
