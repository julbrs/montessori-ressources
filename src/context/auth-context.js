import { createContext } from 'react'

// object we can share between components and when we update it, any component that listens to it will update

export const AuthContext = createContext({ 
    isLoggedIn: false, 
    login: () =>{}, 
    logout: () => {} 
})

// we wrap the parts of our application that should be able to use that context with it