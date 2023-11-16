import axios from "axios";
import Button from "../components/Button";
import { useNavigate, useOutletContext } from "react-router-dom";


export default function Register() {
  const [setNotif] = useOutletContext()
    const navigate = useNavigate()
  async function register(value) {
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          email: value.email,
          password: value.password,
          phoneNumber: value.phoneNumber
        },
        headers : {
            "Authorization" : "Bearer " + localStorage.access_token
        }
      });
      navigate("/home")
      setNotif({
        type : "success",
        message : "Register Successfully, please check your email"
      })
    } catch (error) {
      setNotif({
        type : "delete",
        message : error.response.data.message
      })
    }
  }
  return (
    <div id="form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(e);
          const value = {
            email: e.target[0].value,
            password: e.target[1].value,
            phoneNumber : e.target[2].value
          };
          register(value);
        }}
      >
        <h1>Register</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="phoneNumber">phoneNumber</label>
          <input type="phoneNumber" name="phoneNumber" id="phoneNumber" />
        </div>
        <Button value={"Register"} />
      </form>
    </div>
  );
}
