import React from 'react'

import Footer from 'react-bulma-components/lib/components/footer'
import Container from 'react-bulma-components/lib/components/container'
import Content from 'react-bulma-components/lib/components/content'



const MainFooter = () => {
    return(
            <Footer>
                    <Container  fluid>
                        <Content style={{ textAlign: 'center' }}>
                            <p>
                            <strong>Montessori Ressources</strong> by <a href="http://jgthms.com">Montessori au Québec</a>. The source code is available on <a href="https://github.com/montessori-ressources/web-ui">Github</a>. The website content
                            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                            </p>
                        </Content>
                    </Container>
            </Footer>
    )
}


export default MainFooter