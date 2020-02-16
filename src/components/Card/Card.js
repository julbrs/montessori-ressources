import React from 'react'

import "./Card.css";

const Card = props => {
    

  return (
          <div class="thumbnails">

              <span class="tag is-rounded is-large nomenclature-image-count">
                6
              </span>

              <div class="thumbnail">
                <img src={props.src} alt={props.alt} />
              </div>
              <div class="thumbnail">
                <img src={props.src} alt={props.alt} />
              </div>
              <div class="thumbnail">
                <img src={props.src} alt={props.alt} />
              </div>
              <div class="thumbnail">
                <img src={props.src} alt={props.alt} />
              </div>

          </div>
            
            
    

  );
}


export default Card;