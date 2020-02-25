import React from 'react'
import { NavLink, Link} from 'react-router-dom'

//import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Navbar } from 'react-bulma-components'
import './MainHeader.css'

const MainHeader = props => {
    return (
        <Navbar color="primary" fixed="top">
                <Navbar.Brand>
                    <Navbar.Item>
                        <Link to="/">Montessori Ressources</Link>
                    </Navbar.Item>
                    <Navbar.Burger />
                </Navbar.Brand>

                <Navbar.Menu >
                    <Navbar.Container>
                        <Navbar.Item>
                            <Navbar.Link renderAs={Link} to={`/nomenclature`}>Download</Navbar.Link>
                        </Navbar.Item>
                        <Navbar.Item>
                            <NavLink to="/add">Add</NavLink>
                        </Navbar.Item>
                        <Navbar.Item>
                            <NavLink to="/info">Info</NavLink>
                        </Navbar.Item>
                    </Navbar.Container>

                    <Navbar.Container position="end">
                        <Navbar.Item href="#">
                            Log in
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