import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div id="navbar">
        <div>
          <a href="#">Logo</a>
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
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("access_token");
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
