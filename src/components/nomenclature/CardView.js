import React from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import Box from 'react-bulma-components/lib/components/box';
import Image from 'react-bulma-components/lib/components/image';
import EdiText from 'react-editext';

const CardView = props => {
  return (
    <Columns.Column size={6}>
      <Box>
        <Image
          key={props.card._id}
          alt={props.card.originalname}
          src={props.card.location}
        />
        <EdiText
          className="title is-4"
          type="text"
          value={props.card.originalname}
          onSave={value => {
            let card = props.card;
            card.originalname = value;
            props.onChange(card);
          }}
          editOnViewClick
          submitOnUnfocus
          submitOnEnter
        />
      </Box>
    </Columns.Column>
  );
};
export default CardView;
