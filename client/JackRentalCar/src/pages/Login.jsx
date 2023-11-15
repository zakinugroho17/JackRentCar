import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import './Login.css'
import axios from 'axios'

export default function Login(){
    return (
        <>
      <div id="form">
        <form onSubmit={(e) => {
        //   e.preventDefault()
        //   console.log(e)
        //   const value = { username: e.target[0].value, password: e.target[1].value}
        //   login(value)
        }}>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username"/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <Button value={"Login"}/>
        </form>
      </div>
    </>
    )
}