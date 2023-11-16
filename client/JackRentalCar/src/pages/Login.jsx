import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import './Login.css'
import axios from 'axios'
import { GoogleButton } from "./googleLogin";

export default function Login(){
    const navigate = useNavigate()
    const [setNotif] = useOutletContext()

    async function login(value){
        try {
            // console.log(value, "<<<");
            const {data} = await axios({
                method : "POST",
                url : "http://localhost:3000/login",
                data : {
                    email : value.email,
                    password : value.password
                }
            })

            localStorage.access_token = data.access_token
            navigate('/')
            setNotif({
                type : "success",
                message : "Login Successfully"
            })
        } catch (error) {
            // console.log(error.response, "ini error<<");
            setNotif({
                type : "delete",
                message : error.response.data.message
            })
        }
    }
    return (
        <>
      <div id="form">
        <div>
            <form onSubmit={(e) => {
            e.preventDefault()
            //   console.log(e, "<<< ini e")
            const value = { email: e.target[0].value, password: e.target[1].value}
            login(value)
            
            
            }}>
            <h1>Login</h1>
            <div>
                <label htmlFor="username">Email</label>
                <input type="text" name="email" id="email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <Button value={"Login"}/>
            <GoogleButton />
            </form>
        </div>
      </div>
    </>
    )
}