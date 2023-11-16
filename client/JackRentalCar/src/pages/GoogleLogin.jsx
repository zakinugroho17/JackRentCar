import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import axios from 'axios'

export const GoogleButton = () => {
    const navigate = useNavigate()
    return (
    <>
    <div>
        <GoogleOAuthProvider clientId='115518923140-06mjd7pmm4imd9sa0cpoqb3dvhbnhc6f.apps.googleusercontent.com'>
        <GoogleLogin
            onSuccess={ async credentialResponse => {
                console.log(credentialResponse, "<><");
                try {
             
                    const {data} = await axios.post('http://localhost:3000/auth/google/callback', {
                        code: credentialResponse.credential, 
                    });
                    localStorage.setItem('access_token', data);
                    navigate('/posts')
                } catch (error) {
                    console.error('Login failed:', error.message);
                }
            }}
            onError={() => {
                console.log('Login Failed');
            }}
  useOneTap
/>
        </GoogleOAuthProvider>
    </div>
    </>
    )
}