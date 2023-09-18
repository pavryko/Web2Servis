import React, {useState} from "react";
import "./css/Signup.css"
import { Registring } from '../services/AuthorizationService';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from "./GoogleComp";
import { GoogleInfo } from "../services/AuthorizationService";
import * as AiIcons from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './css/toast.css';
const Signup = () => {
    const[UserName, changeUserName] = useState("");
    const[Password, chnagePassword] = useState("");
    const[Confirmedpassword, changeConfirmedPassword] = useState("");
    const[Name,changeName] = useState("");
    const[Surname,changeSurname] = useState("");
    const[Date, changeDate] = useState("");
    const[Address, changeAddress] = useState("");
    const[Email, changeEmail] = useState("");
    const[TypeOfUser,changeTypeOfUser] = useState("");
    const[Error, changeError] = useState("");
    const[Success, changeSuuccess] = useState("");
    const[Image, setImageUrl] = useState(null);
    const[ImageToDisplay, setImageToDisplay] = useState("//ssl.gstatic.com/accounts/ui/avatar_2x.png");  
    const navigate = useNavigate();
  
    const Register = async(event) =>{
        event.preventDefault();
        changeSuuccess("");
        changeError(" ");
        if(!UserName){
            toast.warning('Enter your username!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(!Password){
            toast.warning('Enter your password!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(!Confirmedpassword){
            toast.warning('Confirm your password!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(Password !== Confirmedpassword){
            toast.warning('Password does not match!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
          
            return;
        }
        if(!Name){
            toast.warning('Enter your name!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(!Surname){
            toast.warning('Enter your surname!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(!Email){
            toast.warning('Enter your e-mail!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(!Address){
            toast.warning('Enter your address!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        if(!TypeOfUser){
            toast.warning('Choose user type!', {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
        }
        
        //saljem podatke na server
        try{
            console.log(UserName,Password,Email,Name,Surname,Date, Address,TypeOfUser,Image);
            const data = await Registring(UserName, Password,Email,  Name, Surname, Date,  Address, TypeOfUser, Image);
            if(data == null){
                toast.warning('User with that username and e-mail already exsist, try again!', {
                    position: "top-center",
                    autoClose: 3000,
                });
                return;
            }
            changeUserName("");
            chnagePassword("");
            changeConfirmedPassword("");
            changeName("");
            changeSurname("");
            changeEmail("");
            changeAddress("");
            setImageUrl("//ssl.gstatic.com/accounts/ui/avatar_2x.png");
            changeSuuccess("Successfully registred!!!");
            navigate('/login');
            
        }
        catch(error){
            console.error(error);
        }
        

    }
    const handleImageChange = e =>{
        console.log("Load image...");
        const selectedImage = e.target.files[0]; 
        setImageUrl(selectedImage);
        setImageToDisplay(URL.createObjectURL(selectedImage))
    }
    const handleGoogleSuccess = (googleProfile) => {
        const fetchData = async () => {
            try {
                console.log(googleProfile);
                const userInfo = await GoogleInfo(googleProfile);
                changeUserName(userInfo.name);
                changeName(userInfo.given_name);
                changeSurname(userInfo.family_name);
                changeEmail(userInfo.email);
                setImageToDisplay(userInfo.picture);
                setImageUrl(userInfo.picture);
            } catch (error) {
              console.error('Error fetching profile data:', error);
            }
          }
          fetchData();
    };
    
    return<>
    <br/><br></br>
    <div className="container-register">
        <div className="Register">
            <div className="left-container">
                <div className="title-container">
                    <h2 className="tittle-login">Join us today!</h2>
                </div>

            <div className="fields">
                <input className="your-input-class" type="email" placeholder="E-mail" value={Email} onChange={(e) => changeEmail(e.target.value)}/><br/>
                <input className="your-input-class" type="text" placeholder="Username"  value={UserName} onChange={(e) => changeUserName(e.target.value)}/><br/>

                <input className="your-input-class" type="text" placeholder="Name"  value={Name} onChange={(e) => changeName(e.target.value)}/>
                <input className="your-input-class" type="text" placeholder="Surname"  value={Surname} onChange={(e) => changeSurname(e.target.value)}/>
                <p>Date of birth</p>
                <input className="your-input-class" type="date" placeholder="date"  value={Date} onChange={(e) => changeDate(e.target.value)}/><br/>
                <input className="your-input-class" type="text" placeholder="Address" value={Address} onChange={(e) => changeAddress(e.target.value)} />
                
            </div>

            </div>
            
            
            <div className="right-container">
            <div className="image-container">
            {ImageToDisplay && <img id="profile-img"  className="profile-img-card" src={ImageToDisplay} alt="Selected Image" />}<br></br>
                 <input type="file" accept=".png, .jpg, .jpeg" style={{height: "34px",float: "right",}} onChange={handleImageChange} /><br></br><br></br>
                 <h3 className="tittle-usertype">I'm singing up as a:</h3><select name="typeOfUser" id="typeOfUser" value={TypeOfUser} onChange={(e) => changeTypeOfUser(e.target.value)} >
                        <option value=""></option>
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                       
                    </select><br/><br></br>
                    <input className="your-input-class" type="password" placeholder="Enter your password" value={Password} onChange={(e) => chnagePassword(e.target.value)} />
                <input className="your-input-class" type="password" placeholder="Confirm your password" value={Confirmedpassword} onChange={(e) => changeConfirmedPassword(e.target.value)} /><br/>
                    {Error && <div className="error_message">{Error}</div>}
                {Success && <div className="success_message">{Success}</div>}<br/><br/>
            </div>

            <div className="button-container">
                <button className="modern-button" onClick={Register}><h3>Signup</h3></button><br></br>
                <div className="centered-container">
                    <GoogleOAuthProvider clientId="117236310370-jv2ro55ptv7s765tavhritij8i8ur86d.apps.googleusercontent.com">
                        <Google onSuccess={handleGoogleSuccess} />
                    </GoogleOAuthProvider>
                </div>
                <br></br><a href="/login">Already have an account? Log in here.</a>
            </div>
    </div>
           
        </div>
    </div>
    </>;
}

export default Signup;