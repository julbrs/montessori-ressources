import React from 'react'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Columns, Box } from 'react-bulma-components'

import "./Card.css";

const Card = props => {
    const TAGS = [{id:'t1', name:'pot'}] // here goes the API for tags

  return (
    <Columns.Column size="half">
      <Box>

        <span class="icon is-large is-pulled-right nomenclature-label">
          <i class="fa fa-check-circle fa-3x"></i>
        </span>

        <article class="media">
          <div class="media-left">
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
            <a href="#" class="button">
              Download
            </a>
          </div>
          <div class="media-content">
            <h2 class="title is-2">{props.name ? props.name : "bla"}</h2>
            <small>By user</small>
            <div class="tags">
              <span class="tag">Gospel</span>
              <span class="tag">Chant</span>
              <span class="tag">Religieux</span>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field is-grouped is-grouped-multiline">
                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark">Images</span>
                      <span class="tag is-success">Yes</span>
                    </div>
                  </div>

                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark">Label</span>
                      <span class="tag is-success">Yes</span>
                    </div>
                  </div>

                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark">Description</span>
                      <span class="tag is-success">Yes</span>
                    </div>
                  </div>

                  <div class="control">
                    <div class="tags has-addons">
                      <span class="tag is-dark">Text with gaps</span>
                      <span class="tag is-danger">No</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                      <span class="icon is-small">
                        <i class="fa fa-reply" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="like">
                      <span class="icon is-small">
                        <i class="fa fa-heart" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </div>

            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Downloads</p>
                  <p class="title is-5">3,456</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Like</p>
                  <p class="title is-5">123</p>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </Box>
    </Columns.Column>
  );
}


export default Card;