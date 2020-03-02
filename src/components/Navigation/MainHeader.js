import React from 'react'
import { NavLink, Link} from 'react-router-dom'
import Navbar from 'react-bulma-components/lib/components/navbar'
import FacebookLogin from 'react-facebook-login'
import {FACEBOOK_CLIENT_ID} from '../../config'
import {API} from '../../config'

const MainHeader = props => {

  const responseFacebook = (response) => {
    console.log(response.accessToken);
    fetch(`${API}/auth/facebook`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${response.accessToken}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `access_token=${response.accessToken}`
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

    return (
        <Navbar color="primary" fixed="top" active={false} transparent={false}>
                <Navbar.Brand>
                    <Navbar.Item>
                        <Navbar.Link renderAs={Link} to={`/`} arrowless>Montessori Ressources</Navbar.Link>
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
                        <Navbar.Item>
                        <FacebookLogin
                          appId={FACEBOOK_CLIENT_ID}
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={responseFacebook} />
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
      </Navbar>
    )
}

export default MainHeader
