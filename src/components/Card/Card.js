import React from 'react'

// TODO remove this import and switch to use react-bulma-components.
import 'react-bulma-components/dist/react-bulma-components.min.css'

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
