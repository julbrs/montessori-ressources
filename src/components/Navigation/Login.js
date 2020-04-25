import React, { useContext, useState, useEffect } from 'react'
//import FacebookLogin from 'react-facebook-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import client from '../../tools/client';

import Navbar from 'react-bulma-components/lib/components/navbar'
import { AiFillFacebook, AiFillGoogleCircle} from 'react-icons/ai';

import {FACEBOOK_CLIENT_ID, GOOGLE_CLIENT_ID} from '../../tools/config'
import GoogleLogin from 'react-google-login'
import { AuthContext } from '../../context/auth-context'

const Login = (props) => {

  const [user, setUser] = useState()
  const auth = useContext(AuthContext)

  // this effect will grab user info at component mount
  useEffect(() => {
    client.get('auth')
      .then((data) => {
        setUser(data.data)
        auth.login()
      })
      .catch((err) => {
        // if auth error let's remove the token
        localStorage.removeItem('token')
        auth.logout()
      })
    }, [auth])

  // when you auth via google grab the token
  const handleGoogle = async (response) => {
    let res = await client.post(`auth/google`, {
      access_token: `${response.accessToken}`
    })
    setUser(res.data)
    localStorage.setItem('token', res.headers['x-auth-token'])
    auth.login()
  }

  // when you auth via facebook grab the token
  const handleFacebook = async (response) => {
    let res = await client.post(`auth/facebook`, {
      access_token: `${response.accessToken}`
    })
    setUser(res.data)
    localStorage.setItem('token', res.headers['x-auth-token'])
    auth.login()
  }

  // when you logout clean the token
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    auth.logout()
  }

  if(user) {
    return (
      <Navbar.Container position="end">
        <Navbar.Item onClick={logout}>
          Logout ({user.name})
        </Navbar.Item>
      </Navbar.Container>
    )
  }
  else {
    return (
      <Navbar.Container position="end">
        <FacebookLogin
          appId={FACEBOOK_CLIENT_ID}
          autoLoad={false}
          fields="name,email,picture"
          render={renderProps => (
            <Navbar.Item onClick={renderProps.onClick}>
              <AiFillFacebook size="2em"/>
            </Navbar.Item>
          )}
          callback={handleFacebook} />

          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleGoogle}
            render={renderProps => (
              <Navbar.Item onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <AiFillGoogleCircle size="2em"/>
              </Navbar.Item>
            )}
            cookiePolicy={'single_host_origin'} />

      </Navbar.Container>
    )
  }
}

export default Login
