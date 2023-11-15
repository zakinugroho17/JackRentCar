import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from "react-router-dom";
import Home from './pages/Home';

function mustLogin() {
  if(!localStorage.access_token){
    return redirect('/login')
  }
  return null
}

function isLogin() {
  if(localStorage.access_token){
    return redirect('/home')
  }
}
// const router = createBrowserRouter([
//   {
//     path : "/",
//     element : <App />,
    
//   }
// ])

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "",
        element : <Home />,
      },
      {
        path : "home",
        element : <Home />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
