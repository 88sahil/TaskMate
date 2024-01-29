import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/Store.js'
import { Provider } from 'react-redux'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import Signup from './pages/signupPage/SignUp.jsx'
import ForgotPass from './pages/forgot/ForgotPass.jsx'
import PasswordReset from './pages/ResetPass/PasswordReset.jsx'
import DashBoard from './components/dashboard/DashBoard.jsx'
import UserPage from './components/dashboard/UserPage.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
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
      },
      {
        path:'/DashBoard',
        element:<DashBoard/>,
        children:[
          {
            path:'/DashBoard/',
            element:<UserPage/>
          }
        ]
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
