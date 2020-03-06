import React from 'react'
import FacebookLogin from 'react-facebook-login'
import client from '../../tools/client';

import Navbar from 'react-bulma-components/lib/components/navbar'

import {FACEBOOK_CLIENT_ID} from '../../tools/config'

const Login = (props) => {

  // when you auth via facebook grab the token
  const handleFacebook = async (response) => {
    let res = await client.post(`auth/facebook`, {
      access_token: `${response.accessToken}`
    })
    props.setUser(res.data)
    localStorage.setItem('token', res.headers['x-auth-token'])
  }

  // when you logout clean the token
  const logout = () => {
    localStorage.removeItem('token')
    props.setUser(null)
  }

  if(props.user) {
    return (
      <Navbar.Container position="end">
        <Navbar.Item onClick={logout}>
          Logout ({props.user.name})
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
          callback={handleFacebook} />
      </Navbar.Container>
    )
  }
}

export default Login
