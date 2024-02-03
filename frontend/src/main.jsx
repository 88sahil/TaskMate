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
import ChangePassword from './components/dashboard/ChangePassword.jsx'
import UpdateUser from './components/dashboard/UpdateUser.jsx'
import MainPage from './components/ProjectDashBoard/MainPage.jsx'
import HomeOver from './components/ProjectDashBoard/HomeOver.jsx'
import TaskList from './components/ProjectDashBoard/TaskList.jsx'
import ProjectOverview from './components/ProjectDashBoard/ProjectOverview.jsx'
import Calendar from './components/ProjectDashBoard/Calendar.jsx'
import ProjectPage from './components/ProjectDashBoard/ProjectPage.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/Home',
        element:<MainPage/>,
        children:[
          {
            path:'/Home/overview',
            element:<HomeOver/>
          },
          {
            path:'/Home/TaskList',
            element:<TaskList/>
          },{
            path:'/Home/Projectoverview',
            element:<ProjectOverview/>
          },
          {
            path:'/Home/calendar',
            element:<Calendar/>
          },{
            path:'/Home/ProjectPage/:projectid',
            element:<ProjectPage/>
          }
        ]
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
      },
      {
        path:'/DashBoard',
        element:<DashBoard/>,
        children:[
          {
            path:'/DashBoard/user',
            element:<UserPage/>
          },{
            path:'/DashBoard/changepass',
            element:<ChangePassword/>
          },{
            path:'/DashBoard/updateuser',
            element:<UpdateUser/>
          }
        ]
      }
    ]
  },
  {
    path:'/resetpass/:token',
    element:<PasswordReset/>  
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>,
)
