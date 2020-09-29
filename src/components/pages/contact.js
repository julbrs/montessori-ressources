import React from 'react'

import Hero from 'react-bulma-components/lib/components/hero'
import Heading from 'react-bulma-components/lib/components/heading'
import Container from 'react-bulma-components/lib/components/container'
import Content from 'react-bulma-components/lib/components/content'
import Section from 'react-bulma-components/lib/components/section'
import ContactForm from 'components/ContactForm/ContactForm'

const Contact = () => {
  return(
    <>
      <Hero color="primary" gradient >
        <Hero.Body>
          <Container>
            <Heading>
              <span role="img" aria-label="book">📖</span> Pour nous contacter
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
      <Section>
        <Content size="medium">
          <p>
            Utiliser le formulaire ci-dessous ou si vous le désirez vous pouvez <a href="mailto:inf%6f@%72essource-mo%6etess%6fri%2en%65t">utiliser ce lien directement</a> pour nous contacter.
          </p>
          <ContactForm />
        </Content>
      </Section>


    </>



  )
}


export default Contact
