import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [notif, setNotif] = useState(null)

  useEffect(() => {
    if(notif) {
      switch(notif.type){
        case "success" : {
          toast.success(notif.message)
          break;
        }

        case "delete" : {
          toast.error(notif.message)
          break;
        }
      }
      setNotif(null)
    }
  }, [notif])

  return (
    <>
       <ToastContainer /> 
       <Navbar setNotif={setNotif}/> 
      <Outlet context={[setNotif, notif]} /> 
      
     
    </>
  )
}

export default App
