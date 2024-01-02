import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retriveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { error } from "jquery"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment"

export default function TodoComponent() {

    const {id} = useParams()

    const authContext = useAuth()

    const username = authContext.username

    const [description, setDiscription] = useState('')

    const [targetDate, setTargetDate]  = useState('')

    const navigate  = useNavigate()

    useEffect(
        () => retriveTodos(),[]
    )

    function retriveTodos(){

        if(id != -1){
            retriveTodoApi(username, id)
                .then(response =>{ 
                setDiscription(response.data.description)
                setTargetDate(response.data.targetDate) 
            })
                .catch(error => console.log(error))
        }

    }

    function onSubmit(values){
        console.log(values)
        const todo = {
            id : id,
            username : username,
            description : values.description,
            targetDate : values.targetDate,
            done : false
        }
        // console.log(todo)

        if(id == -1){
            createTodoApi(username, todo)
            .then(response =>{ 
            // console.log(response)
            navigate('/todos')
        })
        .catch(error => console.log(error))
        }
        else{
        updateTodoApi(username, id, todo)
        .then(response =>{ 
            // console.log(response)
            navigate('/todos')
        })
        .catch(error => console.log(error))

    }
    }
    
    function validate(values){
        let errors = {
            // description: 'Enter a Valid Description 🧐',
            // targetDate : 'Enter a Valid Date 📆'

           
        }

    if(values.description.length < 5){
            errors.description = 'Enter a Valid Description 🧐 More than five 🖐🏻 charcter'
        console.log(values)
        return errors
    }

        if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()){
            errors.targetDate='Enter a Target Date 📆'
        }
    }

    


    return(
        <div className="container">
        
            <h1>Enter the Todo Details </h1>
                <div>
                    <Formik initialValues={{description, targetDate}}
                    enableReinitialize = {true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange = {false}
                    validateOnBlur  = {false}
                    >

                        {
                            (props) =>(
                                <Form>

                                    <ErrorMessage 
                                         name="description"
                                         component="div"
                                         className="alert alert-warning"
                                    />

                                        <ErrorMessage 
                                         name="targetDate"
                                         component="div"
                                         className="alert alert-warning"
                                    />

                                   <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field type = "text"  className = "form-control" name = "description"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field type = "date" className = "form-control" name = "targetDate"/>
                                    </fieldset>

                                    <div>
                                        <button className="btn btn-success m-3" type="submit">Save</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
        </div>
    )
}