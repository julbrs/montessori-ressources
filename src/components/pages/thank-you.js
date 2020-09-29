import React from 'react'

import Hero from 'react-bulma-components/lib/components/hero'
import Heading from 'react-bulma-components/lib/components/heading'
import Container from 'react-bulma-components/lib/components/container'

const ContactConfirmation = () => {
  return(
    <>
      <Hero color="primary" gradient >
        <Hero.Body>
          <Container>
            <Heading>
              <span role="img" aria-label="book">📖</span> Merci pour votre message
            </Heading>
            <Heading subtitle size={5}>
                Nous vous recontacterons dès que possible.
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    </>
  )
}


export default ContactConfirmation
