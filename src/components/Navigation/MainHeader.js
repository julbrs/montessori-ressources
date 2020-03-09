import React from 'react'
import { NavLink, Link} from 'react-router-dom'
import Navbar from 'react-bulma-components/lib/components/navbar'


const MainHeader = props => {
    return (
        <Navbar color="primary" fixed="top" active={false} transparent={false}>
                <Navbar.Brand>
                    <Navbar.Item>
                        <Navbar.Link renderAs={Link} to={`/`} arrowless><span role="img" aria-label="book">📖</span> Montessori Ressources</Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Burger />
                </Navbar.Brand>

                <Navbar.Menu >
                    <Navbar.Container>
                        <Navbar.Item>
                            <Navbar.Link renderAs={NavLink} to={`/nomenclature`} arrowless>Home</Navbar.Link>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Navbar.Link renderAs={NavLink} to={`/add`} arrowless>Add</Navbar.Link>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Navbar.Link renderAs={NavLink} to={`/info`} arrowless>Info</Navbar.Link>
                        </Navbar.Item>
                    </Navbar.Container>

                    <Navbar.Container position="end">
                        <Navbar.Item>
                            <Navbar.Link renderAs={NavLink} to={`/`} arrowless>Log in</Navbar.Link>
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
      </Navbar>
    )
}

export default MainHeader
