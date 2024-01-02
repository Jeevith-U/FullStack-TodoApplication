import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function LoginComponent(){

    const [username, setUsername] = useState('jeevith')
    const [password, setpassword] = useState('pass')
    // const [showSuccessMessage, setSuccessMessage]= useState(false) this use to show msg success
    // but i replaced it with the navigating to welocme page using navigate
    const [showErrorMessage, setErrorMessage]= useState(false)

    const navigate = useNavigate() ;

    const authContext = useAuth() ;

    function handleUsernameChange(event){
        setUsername(event.target.value)
        // console.log(event.target.value)
    }

    function handelUserpasswordChange(event){
        setpassword(event.target.value)
        // console.log(event.target.value)
    }

    function handleSuccess(){

        if(authContext.login(username, password)){
            navigate(`/welcome/${username}`)
        // if(username ==='jeevith' && password==='pass'){
        // authContext.setAuthenticated(true)
        // // console.log('Success')
        // setUsername(username)
        // setSuccessMessage(true)
        // setErrorMessage(false)
        // navigate(`/welcome/${username}`)

        }
    else{
        setErrorMessage(true)
    }
    }

    // function ShowSuccessMessageComponent(){

    //     if(showSuccessMessage){
    //         return <div className='successMessage'>Loged in Successfully</div>
    //     }
    //         return null ;
    // {This functionality is too small no need of indivisual component what we can do is}
    // {showSuccessMessage(if true it print =>) && <div className='successMessage'>Loged in Successfully</div>}
    // }

    // function ErrorMessageComponent(){
    //     if(showErrorMessage){
    //         return <div className='ErrorMessage'>Failed to login Check the credentials</div>
    //     }

    //     return null ;
    // }

    

    return(
        <div className="Login">
           {/* {showSuccessMessage && <div className='successMessage'>Loged in Successfully</div>} */}
           {showErrorMessage && <div className='ErrorMessage'>Failed to login Check the credentials</div>}
        <div><h1>Let's Login...</h1></div>
        <div className="LoginForm">
            <div>
                <label>UserName</label>
                <input type="text" name="username" value={username} onChange={handleUsernameChange} />
            </div>

            <div>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={handelUserpasswordChange}/>
            </div>

            <div>
                <button type="submit" name="login" onClick={handleSuccess}>Login</button>
            </div>
            
        </div>
        
        </div>

        
    )
} 