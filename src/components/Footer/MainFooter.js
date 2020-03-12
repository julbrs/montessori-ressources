import React from 'react'

import Footer from 'react-bulma-components/lib/components/footer'
import Container from 'react-bulma-components/lib/components/container'
import Content from 'react-bulma-components/lib/components/content'





const MainFooter = () => {
    return(
            <Footer>
                    <Container fluid>
                        <Content style={{ textAlign: 'center' }}>
                            <p>
                            <strong>Montessori Ressources</strong> par <a href="https://www.montessori.quebec/">Montessori au Québec</a>. Le code source est disponible sur <a href="https://github.com/montessori-ressources">Github</a>. Le contenu du site est sous license <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                            </p>
                        </Content>
                    </Container>
            </Footer>
    )
}


export default MainFooter
