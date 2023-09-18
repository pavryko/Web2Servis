import React, {useState, useEffect} from "react";
import "./css/Profile.css"
import NavigationBar from './NavigationBar';
import { ProfileData, UpdateProfile, UpdatePassword} from "../services/AuthorizationService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/toast.css';
const ProfileChange = () =>{ 
    const[User, changeUser] = useState({});
    const[image, changeImage] = useState("");
    const[newPassword,changenewPassword] = useState("");
    const[confirmNewPassword,changeConfirmNewPassword] = useState("");
    const[Image, setImageUrl] = useState(null);
    const[ImageToDisplay, setImageToDisplay] = useState("//ssl.gstatic.com/accounts/ui/avatar_2x.png");  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { u, imageBase64 } = await ProfileData();
            changeUser(u);
            changeImage(imageBase64);
            setImageToDisplay( `data:image/jpeg;base64,${imageBase64}`);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        }
        fetchData();
        localStorage.setItem('u',JSON.stringify(User));
        localStorage.setItem('imageBase64',image);
    }, []); 
    const formatDate = (date) => {
        return  date ? date.substring(0, 10) : '';
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        changeUser({
          ...User,
          [name]: value,
        });
    };
    const handleImageChange = (e) =>{
      console.log("Load image...");
      const selectedImage = e.target.files[0]; 
      setImageUrl(selectedImage);
      setImageToDisplay(URL.createObjectURL(selectedImage));
    };
    const Updateprofile = () =>{
        const obj = localStorage.getItem('u');
        const i = localStorage.getItem('imageBase64');
        const obj2 = JSON.parse(obj);
          if(obj2.name === User.name && obj2.surname === User.surname && obj2.userName === User.userName && obj2.date === User.date && Image == null){
            
            toast.warning("You didn't change any information!", {
              position: "top-right",
              autoClose: 3000,
              className: 'custom-toast',
            });
            return;
          }
         
         
          if(!User.userName){
            toast.warning('Enter your username!', {
                position: "top-right",
                autoClose: 3000,
                className: 'custom-toast',
            });
            return;
          }
          if(!User.name){
            toast.warning('Enter your name!', {
              position: "top-right",
              autoClose: 3000,
              className: 'custom-toast',
            });
            return;
          }
          if(!User.surname){
            toast.warning('Enter your surname!', {
              position: "top-right",
              autoClose: 3000,
              className: 'custom-toast',
            });
            return;
          }
          if(!User.email){
            toast.warning('Enter your email!', {
              position: "top-right",
              autoClose: 3000,
              className: 'custom-toast',
            });
            return;
          }
          if(!User.address){
            toast.warning('Enter your address!', {
              position: "top-right",
              autoClose: 3000,
              className: 'custom-toast',
            });
            return;
          }
          try{
            console.log(User.userName,User.name,User.surname, User.date);
            UpdateProfile(User.userName,User.name,User.surname, User.date, User.email, User.address, Image);
            toast.success('Profile successfully changed!', {
              position: "top-right",
              autoClose: 3000,
              className: 'custom-toast',
          });
          }
          catch(e){
            console.log(e);
          }

    };
    const ChangePassword = () =>{
        if(!newPassword){
          toast.warning('Enter your password!', {
            position: "top-right",
            autoClose: 3000,
            className: 'custom-toast',
          });
          return;
        }
        if(!confirmNewPassword){
          toast.warning('Confirm your password!', {
            position: "top-right",
            autoClose: 3000,
            className: 'custom-toast',
          });
          return;
        }
        if(newPassword !== confirmNewPassword){
          toast.error('Passwords does not match!', {
            position: "top-right",
            autoClose: 3000,
            className: 'custom-toast',
          });
          return;
        }
        UpdatePassword(newPassword);
        toast.success('Password successfully changed!', {
          position: "top-right",
          autoClose: 3000,
          className: 'custom-toast',
      });
    };

    return <>
    <NavigationBar/>
    <br></br><br></br><br></br>
    <div className="container2">
        <div className="Register2">
            <div className="fields2"> 
              <h4>Email:
                <input type="text" placeholder="" name="email" value={User.email} onChange={handleChange}/>
              </h4>
              <h4>Username:
                <input type="text" placeholder="" name="userName" value={User.userName} onChange={handleChange}/>
              </h4>
              <h4>Name:
                <input type="text" placeholder="" name="name" value={User.name} onChange={handleChange}/>
              </h4>
              <h4>Surname:
                <input type="text" placeholder="" name="surname" value={User.surname} onChange={handleChange}/>
              </h4>
              <h4>Date:
                <input type="date" placeholder="" name="date" defaultValue={formatDate(User.date)} onChange={handleChange}/>
              </h4>
              <h4>Address:
                <input type="text" placeholder="" name="address" value={User.address} onChange={handleChange}/>
              </h4>
              <button className="updateProfile" onClick={Updateprofile}><h3>Update your profile!</h3></button>
            </div>
            <div className="image2">
              {ImageToDisplay && <img id="profile-img"  className="profile-img-card" src={ImageToDisplay} alt="Selected Image" />}
              <input type="file" accept=".png, .jpg, .jpeg" style={{height: "34px"}} onChange={handleImageChange} />
              <h4>New password:
                <input type="password" placeholder="New password"  value={newPassword} onChange={(e) => changenewPassword(e.target.value)}/>
              </h4>
              <h4>Confirm new password:
                <input type="password" placeholder="Conrifm new password"  value={confirmNewPassword} onChange={(e) => changeConfirmNewPassword(e.target.value)}/>
              </h4>
              <button className="ChangePassword" onClick={ChangePassword}><h3>Change password</h3></button>
            </div>
        </div>
    </div>
    </>;
}

export default ProfileChange;