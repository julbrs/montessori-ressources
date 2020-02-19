import React from 'react'

import "./Card.css";

const Card = props => {
    

  return (
          <div className="thumbnails">

              <span className="tag is-rounded is-large nomenclature-image-count">
                6
              </span>

              <div className="thumbnail">
                <img src={props.src} alt={props.alt} />
              </div>

          </div>
            
            
    

  );
}


export default Card;