
import { useParams, Link } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
import { error } from 'jquery';
import { useState } from 'react';
import { retrieveHelloworldBean, retrieveHelloworldBeanPathVariable } from './api/HelloWorldApiService';


export default function WelcomeComponent(){

    // const params = useParams()
    //console.log(params.username) this is one way of doing it 

    const [message, setMessage] = useState(null)

    const {username} = useParams()
    // console.log(username)

    function callHelloWorldRestApi(){
        console.log("Om Namha Shivaya")
        retrieveHelloworldBean()

        // axios.get('http://localhost:8080/hello-world')
        // .then( (response) => sucessfulResponse(response) )
        // .catch( (response) => errorResponse(error))
        // .finally( () => console.log('cleanup'))

        // for 2nd url
        // .then( (response) => sucessfulResponse(response) )
        // .catch( (response) => errorResponse(error))
        // .finally( () => console.log('cleanup'))

        // for 3rd url with pathvariable
        retrieveHelloworldBeanPathVariable('Jee')
        .then( (response) => sucessfulResponse(response) )
        .catch( (response) => errorResponse(error))
        .finally( () => console.log('cleanup'))

    }

    function sucessfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(response){
        console.log(response)
    }
   


    return(
        <div>
        <div className="Welcome">Welcome Component</div>
        <div><h1>Here we gooo {username}</h1></div><br />
        <div><Link to="/todos">View Todos ✅</Link></div>
        <div className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Helloworld</div>
        <div className="text-info">{message}</div>
        </div>
    )
} 