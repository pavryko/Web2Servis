import React, {useState, useEffect} from "react";
import {useNavigate } from "react-router-dom";
import "./css/AdminUserControl.css"
import { UnAcceptedUsers, AcceptedUsers } from "../services/AuthorizationService";
import NavigationBar from './NavigationBar';
import { AcceptUser,DeclineUser, DeclinedUsers } from "../services/AuthorizationService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './css/toast.css';

const UserControl = () =>{
    const[unacceptedUsers, changeUnAcceptedUsers] = useState([]);
    const[acceptedUsers, changeAcceptedUsers] = useState([]);
    const[declinededUsers, changeDeclinedUsers] = useState([]);
    const [userToAccept, changeUserToAccept] = useState(null);
    const [userToDecline, changeuserToDecline] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await  UnAcceptedUsers();
          changeUnAcceptedUsers(data);
          const data2 = await  AcceptedUsers();
          changeAcceptedUsers(data2);
          const data3 = await  DeclinedUsers();
          changeDeclinedUsers(data3);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
      fetchData();
      localStorage.setItem('unaccusers', JSON.stringify(unacceptedUsers));
      localStorage.setItem('accusers', JSON.stringify(acceptedUsers));
      }, []);
      useEffect(() => {

        const interval = setInterval(() => {
          const fetchData = async () => {
            try {
              const data = await  UnAcceptedUsers();
              changeUnAcceptedUsers(data);
              const data2 = await  AcceptedUsers();
              changeAcceptedUsers(data2);
              const data3 = await  DeclinedUsers();
              changeDeclinedUsers(data3);
             
            } catch (error) {
              console.error('Error fetching profile data:', error);
            }
          }
          fetchData();
          localStorage.setItem('unaccusers', JSON.stringify(unacceptedUsers));
          localStorage.setItem('accusers', JSON.stringify(acceptedUsers));
        }, 1000);
      }, [userToAccept,userToDecline]);
    const AcceptUsers = (id) =>{
      console.log(id);
      AcceptUser(id);
    } 
    const DeclineUsers = (id) =>{
      console.log(id);
      DeclineUser(id);
    } 
    const handleAcceptClick = userId => {
      changeUserToAccept(userId);
    };
    const handleDeclineClick = userId => {
      changeuserToDecline(userId);
    };
    const confirmAccept = userId => {
      AcceptUsers(userId);
      changeUserToAccept(null);
      toast.info('User accepted!', {
        position: "top-right",
        autoClose: 3000,
        className: 'custom-toast',
      });
    };
    const confirmDecline = userId => {
      DeclineUsers(userId);
      changeuserToDecline(null);
      toast.info('User declined!', {
        position: "top-right",
        autoClose: 3000,
        className: 'custom-toast',
      });
    };
    
    return <>
    <NavigationBar/>
    {userToAccept && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Are you sure you want to accept this user?</h2>
                    <button onClick={() => confirmAccept(userToAccept)}>Yes</button>
                    <button onClick={() => changeUserToAccept(null)}>No</button>
                </div>
            </div>
    )}
    {userToDecline && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Are you sure you want to decline this user?</h2>
                    <button onClick={() => confirmDecline(userToDecline)}>Yes</button>
                    <button onClick={() => changeuserToDecline(null)}>No</button>
                </div>
            </div>
    )}

    <div className="orders-container">
      <div className="orders-column">
        <h1 className="title">Pending approval:</h1>

        {unacceptedUsers.map((u) => (
          <div className="order-box" key={u.id} >
          <img id="profile-img" className="accuser-img-card" src={`data:image/jpeg;base64,${u.image}`} alt="Selected Image" />
          <div className="user-info">
            <h2>{u.userName}</h2>
            <p>{u.email}</p>
            <p>{u.name} {u.surname}</p>
           
          </div>
          <div className="buttons-container">
            <button onClick={() => handleAcceptClick(u.id)}>Accept user</button>
            <button onClick={() => handleDeclineClick(u.id)}>Decline user</button>
          </div>
        </div>
      ))}
      </div>
      <div className="orders-column">
      <h1 className="title">Accepted users:</h1>
      <br></br> <br></br>
        {acceptedUsers.map((u) => (
          <div className="order-box" key={u.id} >
           <img id="profile-img" className="accuser-img-card" src={`data:image/jpeg;base64,${u.image}`} alt="Selected Image" />
           <div className="user-info">
             <h2>{u.userName}</h2>
             <p>{u.email}</p>
             <p>{u.name} {u.surname}</p>
           </div>
         </div>
        ))}
      </div>
      <div className="orders-column">
      <h1 className="title">Declined users:</h1>
      <br></br> <br></br>
        {declinededUsers.map((u) => (
          <div className="order-box" key={u.id} >
           <img id="profile-img" className="accuser-img-card" src={`data:image/jpeg;base64,${u.image}`} alt="Selected Image" />
           <div className="user-info">
             <h2>{u.userName}</h2>
             <p>{u.email}</p>
             <p>{u.name} {u.surname}</p>
           </div>
         </div>
        ))}
      </div>
    </div>
   

   
    </>;
}

export default UserControl;