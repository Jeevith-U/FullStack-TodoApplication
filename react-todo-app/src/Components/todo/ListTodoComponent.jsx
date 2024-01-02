import { useEffect, useState } from "react"

import { retriveAllTodosFormUserNameApi , deleteTodoApi} from "./api/TodoApiService"
import { error } from "jquery"
import { AuthContext, useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function ListTodoComponent(){

    const today  = new Date()

    const targetdate = new Date(today.getFullYear+12, today.getMonth(), today.getDay())

    // const username = AuthContext.username
   
    const navigate = useNavigate()

    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState(null)

    const authContext = useAuth()

    const username = authContext.username

    function refreshTodos(){

        retriveAllTodosFormUserNameApi(username)
    .then(response => {
        console.log(response.data)

        setTodos(response.data)
    })
    .catch(error => console.log(error))
    
}

useEffect( () => refreshTodos(), [] )

function deleteTodo(id){
    // console.log("Ohh yaa u clicked me"+id)
    deleteTodoApi(username, id)
    .then(
        () => {
            setMessage(`Deleted the Todo With ${id}`)
            refreshTodos()
        }
    )
    .catch(error => console.log(error))
}

function updateTodo(id){
    // console.log("Ohh yaa u clicked me for update "+id)
    navigate(`/todos/${id}`)
}

function addNewTodo(){

    navigate(`/todos/-1`)
}



    return(
        <div className="container">
            <h1>Things ToDo 😎</h1>   
            <div className="alert alert-warning">{message}</div>        
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th>Id</th><br/> */}
                            <th>Discription</th><br />
                            <th>Done</th><br />
                            <th>Target Date</th><br/>
                            <th>Delete</th>
                            <th>Update</th>

                            
                        </tr>
                    </thead>

                    <tbody>
                       {

                          todos.map(
                                    todo =>(
                                        <tr>
                                            {/* <td>{todo.id}</td><br/> */}
                                            <td>{todo.description}</td><br />
                                            <td>{todo.done.toString()}</td><br />
                                            {/* <td>{todo.targetdate.toString()}</td> */}
                                            <td>{todo.targetDate}</td><br />
                                            <td><button className="btn btn-warning"
                                             onClick={() => deleteTodo(todo.id)}>Delete</button></td>

                                            <td><button className="btn btn-success"
                                             onClick={() => updateTodo(todo.id)}>Update</button></td>
                                        </tr>
                                    )
                                )
                       }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-3"  onClick={addNewTodo}>Add Todo</div>
        </div>
    )
}
