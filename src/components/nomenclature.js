import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Box from 'react-bulma-components/lib/components/box';
import Card from './Card/Card';

const Nomenclature = props => {
  return (
    <Columns.Column desktop={12} >
      <Box>
        <article className="media">
          <div className="media-left">
            {props.nomenclature.cards.slice(0, 1).map(card => (
              <Card
                key={card._id}
                alt={card.originalname}
                src={card.location}
                imageCount={props.nomenclature.cards.length}
                images={props.nomenclature.cards}
              />
            ))}
            <Button
              renderAs={Link}
              to={`/nomenclature/${props.nomenclature._id}`}
            >
              Télécharger
            </Button>
            <Button
              renderAs={Link}
              to={`/nomenclature/view/${props.nomenclature._id}`}
            >
              Voir
            </Button>
          </div>

          <div className="media-content">
            <h2 className="title is-3">
              {props.nomenclature.name ? props.nomenclature.name : 'bla'}
            </h2>
            <small>Par user</small>
            <div className="tags">
              <span className="tag">Gospel</span>
              <span className="tag">Chant</span>
              <span className="tag">Religieux</span>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field is-grouped is-grouped-multiline">
                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">Images</span>
                      <span className="tag is-success">Oui</span>
                    </div>
                  </div>

                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">Label</span>
                      <span className="tag is-success">Oui</span>
                    </div>
                  </div>

                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">Description</span>
                      <span className="tag is-success">Oui</span>
                    </div>
                  </div>

                  <div className="control">
                    <div className="tags has-addons">
                      <span className="tag is-dark">Texte à trous</span>
                      <span className="tag is-danger">Non</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <nav className="level is-mobile">
                  <div className="level-left">
                    <a className="level-item" href="/" aria-label="reply">
                      <span className="icon is-small">
                        <i className="fa fa-reply" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a className="level-item" href="/" aria-label="like">
                      <span className="icon is-small">
                        <i className="fa fa-heart" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
            <nav className="level">
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Téléchargements</p>
                  <p className="title is-5">3,456</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">J'aime</p>
                  <p className="title is-5">123</p>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </Box>
    </Columns.Column>
  );
};
export default Nomenclature;
