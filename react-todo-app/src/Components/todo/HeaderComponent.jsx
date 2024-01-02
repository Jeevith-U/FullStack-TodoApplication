import { Link } from 'react-router-dom';
import { AuthContext, useAuth } from './security/AuthContext';
import { useContext } from 'react';

function HeaderComponent(){

    // const authContext = useContext(AuthContext)
    const authContext = useAuth() ; 
    const isAuthenticated = authContext.isAuthenticated

    // console.log(authContext)
    // console.log(`Header Component - ${authContext.number}`)

    function logoutNow(){
        authContext.logout()
    }

    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                <h3><li className="nav-item"> <a className = "nav-link" href='https://github.com/Jeevith-U'>Check Me Out </a></li></h3>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                            {isAuthenticated &&  <Link className="nav-link"  to = "/welcome/:username">Home</Link> }
                        </li> 
                           
                        <li className="nav-item">
                            {isAuthenticated && <Link className="nav-link"  to = "/todos">All Todo's</Link> }
                        </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                    <li className="nav-item">
                     { !isAuthenticated && <Link className="nav-link"  to = "/login">Login</Link> }
                     </li>
               <li className="nav-item">
                    {isAuthenticated &&  <Link className="nav-link"  to = "/logout" onClick={logoutNow}>Logout</Link> }
                </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    )

}

export default HeaderComponent