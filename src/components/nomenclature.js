import React from 'react'

import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Box } from 'react-bulma-components'
import Card from './Card/Card'




const Nomenclature = props => {
  
  return (
    <Box>
      <article class="media">
          <div class="media-left">
              {props.nomenclature.cards.map(card => (
                  <Card key={card._id} alt={card.originalname} src={card.location} />
              ))}
              <a href="#" class="button">Download</a>
          </div>

          <div class="media-content">
            <h2 class="title is-3">{props.nomenclature.name ? props.nomenclature.name : "bla"}</h2>
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
  )

}
export default Nomenclature
