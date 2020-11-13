import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bulma-components/lib/components/navbar'
import Login from './Login'
import { AuthContext } from '../../context/auth-context'

const MainHeader = props => {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open)
  }

  /* Call useContext and pass in the AuthContext. We get back an object which will hold the latest context. 
  The component will re-render whenever this context changes */
  const auth = useContext(AuthContext);

  return (
      <Navbar color="primary" fixed="top" active={open} transparent={false}>
        <Navbar.Brand>
          <Navbar.Item renderAs={Link} to={`/`} arrowless>
            <span role="img" aria-label="book">📖</span> Montessori Ressources
          </Navbar.Item>
          <Navbar.Burger active = {open} onClick= {handleClick} />
        </Navbar.Brand>

        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item renderAs={Link} to={`/`}>
              Nomenclatures
            </Navbar.Item>
            {auth.isLoggedIn && (
            <Navbar.Item renderAs={Link} to={`/add`}>
              Créer
            </Navbar.Item> )}
            <Navbar.Item renderAs={Link} to={`/info`}>
              À propos
            </Navbar.Item>
            <Navbar.Item renderAs={Link} to={`/contact`}>
              Nous contacter
            </Navbar.Item>
            {auth.isLoggedIn && (
            <Navbar.Item renderAs={Link} to={`/admin`}>
              Admin
            </Navbar.Item> )}
          </Navbar.Container>
          <Login/>
        </Navbar.Menu>
      </Navbar>
  )
}

export default MainHeader