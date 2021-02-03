import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import Heading from "react-bulma-components/lib/components/heading";
import Card from "./card";
import Tags from "./tags";
import * as ROUTES from "../../constants/routes";

const NomenclatureCard = (props) => {
  const { document } = props;
  console.log(document);
  return (
    <Columns.Column size="half" tablet={{ size: 12 }} desktop={{ size: 6 }}>
      <Box>
        <Columns breakpoint="tablet">
          <Columns.Column>
            {document.cards.slice(0, 1).map((card, idx) => (
              <Card
                key={idx}
                alt={card.name}
                src={card.file.src}
                imageCount={document.cards.length}
                images={document.cards}
              />
            ))}
            <Button renderAs={Link} to={`${ROUTES.DOCUMENT}/${document.id}`}>
              Télécharger
            </Button>
          </Columns.Column>
          <Columns.Column>
            <Heading size={3}>{document.title}</Heading>
            <p>
              <small>
                Par <strong>{document.author}</strong>
              </small>
            </p>
            <Tags tags={document.tags} />
            <hr />
          </Columns.Column>
        </Columns>
      </Box>
    </Columns.Column>
  );
};
export default NomenclatureCard;
