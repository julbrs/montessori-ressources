import React from 'react'
import { NavLink, Link} from 'react-router-dom'
import Navbar from 'react-bulma-components/lib/components/navbar'
import GoogleLogin from 'react-google-login'


const MainHeader = props => {
    const responseGoogle = (response) => {
        console.log(response)
      }

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
                            <Navbar.Link renderAs={NavLink} to={`/`} arrowless>
                            <GoogleLogin
                            clientId="450944417353-pe3vqggjq8ouakahnr8futu7eju6jvm7.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'} />
                            </Navbar.Link>
                        </Navbar.Item>
                    </Navbar.Container>
                </Navbar.Menu>
      </Navbar>
    )
}

export default MainHeader
