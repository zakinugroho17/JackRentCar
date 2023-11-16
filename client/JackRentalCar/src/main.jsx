import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeUser from './pages/HomeUser';
import { element } from 'prop-types';
import AddTransportation from './pages/AddTransportation';
import DetailsTransportation from './pages/DetailsTransportation';
import axios from 'axios';

async function mustLogin() {
  if(!localStorage.access_token){
    return redirect('/login')
  }
  return null
}

async function mustLoginAdmin() {
  if (!localStorage.access_token) {
    return redirect('/login')
  } else if (localStorage.access_token) {
    const {data} = await axios({
      method : "get",
      url : "http://localhost:3000/checkrole",
      headers : {
        "Authorization" : "Bearer " + localStorage.access_token
      }
    })
    if (data.role === "User"){
      return redirect("/home/user")
    } 
  }
  return null
}

function isLogin() {
  if(localStorage.access_token){
    return redirect('/home')
  }
  return null
}

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "",
        element : <Home />,
        loader : mustLoginAdmin
      },
      {
        path : "home",
        element : <Home />,
        loader : mustLoginAdmin
      },
      {
        path : "login",
        element : <Login />,
        loader : isLogin
      },
      {
        path : "register",
        element : <Register />
      },
      {
        path : "home/user",
        element : <HomeUser />,
        loader : mustLogin
      },
      {
        path : "transportation/add",
        element : <AddTransportation/>,
        loader : mustLogin
      },
      {
        path : "transportation/edit/:id",
        element : <AddTransportation/>,
        loader : mustLogin
      },{
        path : "transportation/:id",
        element : <DetailsTransportation/>,
        loader : mustLogin
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
