import React, {useState} from "react";
import './css/Login.css'
import { Logging } from '../services/AuthorizationService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { FaShoppingBag } from 'react-icons/fa';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Google from "./GoogleComp";
import { GoogleInfo,LoggingWithGoogle } from "../services/AuthorizationService";

const Login = (props) =>{
    const [UserName, changeUsername] = useState("");
    const [Password, changePassword] = useState("");
    const[Error, changeError] = useState("");
    const[token, changeToken] = useState("");
    const[confirmed, chnageConfirmed] = useState();
    const[googleUsername,changeGoogleUsername] = useState("");
    const[googleToken,chnageGoogleToken] = useState("");
    const navigate = useNavigate();
   
    const Login = async(event) =>{
        event.preventDefault();
        console.log(UserName);
        console.log(Password);
        changeError(" ");
        if(!UserName || !Password){
            toast.error('Enter your username and password!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }

        try{
            localStorage.setItem('token', "");
            await Logging(UserName, Password);
            chnageConfirmed();
            changeToken(localStorage.getItem('token'));
            
            if(localStorage.getItem('token')!== ""){

                if(localStorage.getItem('confirmed') === "Pending" && localStorage.getItem('typeOfUser') === "Seller" ){
                    navigate('/unauthorized');
                    toast.info('Waiting for admins to accept you!', {
                        position: "top-right",
                        autoClose: 3000,
                        className: 'custom-toast',
                    });
                }
                else{
                    toast.success(`Welcome ${UserName} !`, {
                        position: "top-right",
                        autoClose: 3000,
                        className: 'custom-toast',
                    });
                    navigate('/dashboard');
                }
            }
            else{
                toast.error('Incorect username or/and password!', {
                    position: "top-center",
                    autoClose: 3000,
                    className: 'custom-toast',
                  });
               
            }
        }
        catch(error){
            console.error(error);
        }
    }
    const handleGoogleSuccess = async(googleProfile) => {
        console.log(googleProfile.credential);
       
            try {
                console.log(googleProfile);
                const userInfo = await GoogleInfo(googleProfile);
                console.log(userInfo.email);
                changeGoogleUsername(userInfo.email);
                chnageGoogleToken(googleProfile.credential);

                await GoogleLogIn(userInfo.email,googleProfile.credential);
            } catch (error) {
              console.error('Error fetching profile data:', error);
            }
       
        
    };
    const GoogleLogIn = async(googleusername,googletoken) =>{
       
            try {
                localStorage.setItem('token', "");
                console.log(googleusername, googletoken);
                await LoggingWithGoogle(googleusername, googletoken);
                chnageConfirmed();
                changeToken(localStorage.getItem('token'));
                
                if(localStorage.getItem('token')!== ""){
    
                    if(localStorage.getItem('confirmed') === "Pending" && localStorage.getItem('typeOfUser') === "Seller" ){
                        navigate('/unauthorized');
                        toast.info('Waiting for admins to accept you!', {
                            position: "top-right",
                            autoClose: 3000,
                            className: 'custom-toast',
                        });
                    }
                    else{
                        toast.success(`Welcome ${googleUsername} !`, {
                            position: "top-right",
                            autoClose: 3000,
                            className: 'custom-toast',
                        });
                        navigate('dashboard');
                    }
                }
                else{
                    toast.error('First, you need to register with google account!', {
                        position: "top-center",
                        autoClose: 3000,
                        className: 'custom-toast',
                      });
                   
                }
            } catch (error) {
              console.error('Error fetching profile data:', error);
            }
       
       
    }
    return<>
    <br/><br/><br/><br/>
    <div className="login-container">
        <div className="Log">
            <div className="icon-comment-container">
            <div className="icon-wrapper">
                <FaShoppingBag className="ikonica"/>
            </div>
            <div className="comment-wrapper">
                <h1 className="tittle-login">E-Shop</h1>
                <p className="cool-comment">Shop Smart, Shop with E-Shop</p>
            </div>
            </div>
        <br/><br/><br/>
        {Error && <div className="error_message">{Error}</div>}
        <br/><br/><input type="text" placeholder="Username" value={UserName} onChange={(e) => changeUsername(e.target.value)}/><br/><br/>
        <input type="password" placeholder="Password" value={Password} onChange={(e) => changePassword(e.target.value)}/><br/>
        <button className="modern-button" onClick={Login}><h3>Log in</h3></button><br/><br/>
        <div className="centered-container">
            <GoogleOAuthProvider clientId="117236310370-jv2ro55ptv7s765tavhritij8i8ur86d.apps.googleusercontent.com">
                <Google onSuccess={handleGoogleSuccess} />
            </GoogleOAuthProvider>
        </div>
        <br/>
        <a href="/signup">You don't have an account? Register here.</a>
        </div>
    </div>
    </>;
}

export default Login;
