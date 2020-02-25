import React from 'react'
import { NavLink, Link} from 'react-router-dom'

//import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Navbar } from 'react-bulma-components'
import './MainHeader.css'

const MainHeader = props => {
    return (
        <Navbar color="primary" fixed="top" active="false" transparent="false">
                <Navbar.Brand>
                    <Navbar.Item>
                        <Navbar.Link renderAs={Link} to={`/`} arrowless="false">Montessori Ressources</Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Burger />
                </Navbar.Brand>

                <Navbar.Menu >
                    <Navbar.Container>
                        <Navbar.Item>
                            <Navbar.Link renderAs={NavLink} to={`/nomenclature`} arrowless="false">Home</Navbar.Link>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Navbar.Link renderAs={NavLink} to={`/add`} arrowless="false">Add</Navbar.Link>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Navbar.Link renderAs={NavLink} to={`/info`} arrowless="false">Info</Navbar.Link>
                        </Navbar.Item>
                    </Navbar.Container>

                    <Navbar.Container position="end">
                        <Navbar.Item>
                            <Navbar.Link renderAs={NavLink} to={`/`} arrowless="false">Log in</Navbar.Link>
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
      </Navbar>

      
    )
}


export default MainHeader

{/*  <header className="main-header">
            <button className="main-navigation__menu-btn">
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">Montessori Ressources</Link> 
            </h1>
            <nav>
            <ul className="nav-links">
                <li><NavLink to="/" exact>Home</NavLink></li>
                <li><NavLink to="/add">Add</NavLink></li>
                <li><NavLink to="/info">Info</NavLink></li>
            </ul>
            </nav>    
    </header> */}