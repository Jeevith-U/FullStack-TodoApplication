import axios from 'axios';

// export function retrieveHelloworldBean(){

//     return axios.get('http://localhost:8080/hello-world-bean')
// } { we can simplify this using an arrow function as shown below}

const apiClient = axios.create(

    {
        baseURL : 'http://localhost:8080'
    }
)

export const retrieveHelloworldBean = () =>  apiClient.get('http://localhost:8080/hello-world-bean')

export const retrieveHelloworldBeanPathVariable = 
                     (username) => apiClient.get(`/hello-world/path-variable/${username}`)