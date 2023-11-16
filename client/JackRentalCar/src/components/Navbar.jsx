import { Link, useNavigate, useOutletContext } from "react-router-dom";
import "./Navbar.css";
import { useEffect } from "react";

export default function Navbar({ setNotif }) {
  const navigate = useNavigate()
  


  return (
    <>
      <div id="navbar">
        <div>
          <a href="#"><h1>Jack</h1> <span>RentalCars</span> </a>
        </div>
        <div id="menu">
          <div>
            <Link to="/home">Home</Link>
          </div>
          <div>
            <a href="#">Rental Cars</a>
          </div>
          <div>
            <a href="#">About</a>
          </div>
        </div>
        <div id="user">
            {localStorage.access_token ? 
            <>
              <div>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  // navigate('/login')
                  setNotif({
                    type : "success",
                    message : "Logout Successfully"
                })
                }}
              >
                Logout
              </Link>
              </div>
            </>
             : 
            <>
              <div>
                <Link to="/register">Register</Link>
              </div>
              <div>
                <Link to="/login">Login</Link>
              </div>
            </>
            }
        </div>
      </div>
    </>
  );
}
