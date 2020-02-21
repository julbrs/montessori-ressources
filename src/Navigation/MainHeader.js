import React from 'react'
import { NavLink, Link} from 'react-router-dom'

import './MainHeader.css'

const MainHeader = props => {
    return (
        <header className="main-header">
            <button className="main-navigation__menu-btn">
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">Montessori-Ressources</Link> 
            </h1>
            <nav>
            <ul className="nav-links">
                <li><NavLink to="/" exact>home</NavLink></li>
                <li><NavLink to="/add">add</NavLink></li>
                <li><NavLink to="/info">info</NavLink></li>
            </ul>
            </nav>    
      </header>
    )
}


export default MainHeader