import React, {useState} from 'react'
import FacebookLogin from 'react-facebook-login'

import {FACEBOOK_CLIENT_ID} from '../../config'
import {API} from '../../config'

const Login = () => {
  let localUser = localStorage.getItem('user')
  if(localUser) {
    localUser = JSON.parse(localUser)
  }
  const [user, setUser] = useState(localUser)

  const responseFacebook = async (response) => {
    let data = await fetch(`${API}/auth/facebook`, {
      method: 'POST',
      headers: {
        access_token: `${response.accessToken}`
      }
    })

    let json = await data.json()
    setUser(json)
    localStorage.setItem('user', JSON.stringify(json));

  }

  if(user) {
    return (
      <div>{user.name}</div>
    )
  }
  else {
    return (
      <FacebookLogin
        appId={FACEBOOK_CLIENT_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook} />
    )
  }
}

export default Login
