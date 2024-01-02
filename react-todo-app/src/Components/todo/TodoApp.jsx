// TodoApp.jsx

import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, Navigate } from 'react-router-dom';
import './Todo.css' ;
import LogoutComponent from './LogoutComponent' ;
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodoComponent from './ListTodoComponent';
import ErrorLoginComponent from './ErrorLoginComponent';
import LoginComponent from './LoginComponent';
import WelcomeComponent from './WelcomeComponent';
import AuthProvider, { useAuth } from './security/AuthContext';
import TodoComponent from './TodoComponent';

function AuthenticatedRoute({children}){
    const authContext = useAuth() ;

    if(authContext.isAuthenticated)
        return children
    
    return <Navigate to = "/" /> 

}

export default function TodoApp() {
    return (
      <div className="TodoApp">

        <AuthProvider>
            <BrowserRouter>
                <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}></Route>
                        <Route path='login' element={<LoginComponent/>}/>
                        <Route path='welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute> 
                            }/>
                        <Route path='todos' element = {
                            <AuthenticatedRoute>
                                <ListTodoComponent/>
                            </AuthenticatedRoute>
                            }/>

                        <Route path='todos/:id' element = {
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>
                            }/>
                        <Route path='logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='*' element={<ErrorLoginComponent/>}/>
                        
                    </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </AuthProvider>
      </div>
    );
  }









