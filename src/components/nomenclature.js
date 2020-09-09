import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context'

import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import Card from './Card/Card';
import Tags from './Tags'

const Nomenclature = props => {
  
  const auth = useContext(AuthContext)

  return (
    <Columns.Column size="half" tablet={{size: 12}} desktop={{size: 6}}>
      <Box>
        <Columns breakpoint="tablet">
          <Columns.Column>
            {props.nomenclature.cards.slice(0, 1).map(card => (
                <Card
                  key={card.id}
                  alt={card.originalname}
                  src={card.location}
                  imageCount={props.nomenclature.cards.length}
                  images={props.nomenclature.cards}
                />
              ))}
              {auth.isLoggedIn && (
              <Button
                renderAs={Link}
                to={`/nomenclature/${props.nomenclature.id}`}>
                Télécharger
              </Button> )}
          </Columns.Column>
          <Columns.Column>
            <Heading size={3}>
              {props.nomenclature.name ? props.nomenclature.name : 'sans nom'}
             </Heading>
              <p>
                <small>Par <strong>{props.nomenclature.author}</strong></small>
              </p>
              <Tags tags={props.nomenclature.tags} />
              <hr />
          </Columns.Column>
        </Columns>
      </Box>
    </Columns.Column>
  );
};
export default Nomenclature;
