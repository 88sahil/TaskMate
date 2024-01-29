import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import Signup from './pages/signupPage/SignUp.jsx'
import ForgotPass from './pages/forgot/ForgotPass.jsx'
import PasswordReset from './pages/ResetPass/PasswordReset.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },{
    path:'/forgotPassword',
    element:<ForgotPass/>
  },{
    path:'/resetpass/:token',
    element:<PasswordReset/>  
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
