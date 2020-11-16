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
            Utiliser le formulaire ci-dessous ou si vous le désirez vous pouvez <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#110;&#102;&#111;&#64;&#109;&#111;&#110;&#116;&#101;&#115;&#115;&#111;&#114;&#105;&#45;&#114;&#101;&#115;&#115;&#111;&#117;&#114;&#99;&#101;&#115;&#46;&#110;&#101;&#116;">utiliser ce lien directement</a> pour nous contacter.
          </p>
          <ContactForm />
        </Content>
      </Section>


    </>



  )
}


export default Contact
