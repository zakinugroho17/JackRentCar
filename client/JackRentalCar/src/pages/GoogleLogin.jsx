import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate, useOutletContext } from "react-router";
import axios from "axios";

export const GoogleButton = () => {
  const navigate = useNavigate();
  const [setNotif] = useOutletContext();
  return (
    <>
      <div>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              // console.log(credentialResponse.credential, "<><");
              try {
                // console.log(credentialResponse.credential ,"cre");
                const { data } = await axios.post(
                  "http://localhost:3000/auth/google/callback",
                  {
                    code: credentialResponse.credential,
                  }
                );
                console.log("test");
                localStorage.setItem("access_token", data);
                navigate("/");
                setNotif({
                  type: "success",
                  message: "Login Successfully",
                });
              } catch (error) {
                console.log("Login failed:", error.message);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </GoogleOAuthProvider>
      </div>
    </>
  );
};
