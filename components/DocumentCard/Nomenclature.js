import React from "react";
import Link from "next/link";
import { Button, Columns, Heading } from "react-bulma-components";
import Card from "./Card";
import Tags from "./Tags";

const NomenclatureCard = (props) => {
  const { document } = props;
  return (
    <Columns.Column size="half" tablet={{ size: 12 }} desktop={{ size: 6 }}>
      <>
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
            <Button renderAs={Link} href={`document/${document.id}`}>
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
      </>
    </Columns.Column>
  );
};
export default NomenclatureCard;
