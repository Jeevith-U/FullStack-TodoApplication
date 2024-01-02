// creating context
// putting state in the context
//share the create context with other components

import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext) // this help us to use this easly

export default function AuthProvider({children}){

    const [number, setNumber] =useState(22) 

    const [username, setUsername] =useState(null)

    const [isAuthenticated, setAuthenticated] = useState(false)

    // setInterval( () => setNumber(number+2) ,1000)

    function login(username, password){
        if(username ==='jeevith' && password==='pass'){
            setAuthenticated(true)  
            setUsername(username)
            return true 
    
            }
        else{
            setAuthenticated(false)
            setUsername(null)
           return false
        }
    }

    function logout(){
        setAuthenticated(false)
    }

    const valueToBeShared = {number, isAuthenticated, username, login, logout}
    return(
        <AuthContext.Provider value={valueToBeShared}>
            {children}
        </AuthContext.Provider>
    )
}