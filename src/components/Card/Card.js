import React from 'react'

// TODO remove this import and switch to use react-bulma-components.
import 'react-bulma-components/dist/react-bulma-components.min.css'
import Tag from 'react-bulma-components/lib/components/tag'
import "./Card.css";

const Card = props => {


  return (
          <div className="thumbnails">

              <Tag rounded size="large" className="nomenclature-image-count">
                {props.imageCount}
              </Tag>

              <div className="thumbnail">
                <img src={props.src} alt={props.alt} />
              </div>

          </div>




  );
}


export default Card;
