import React,{useState, useEffect} from "react";
import "./css/NavigationBar.css"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import { SidebarData, AdminData,SellerData, SellerVerifiedData, BuyerData } from "./data/NavData";
import { IconContext } from "react-icons";
import * as IoIcons from 'react-icons/io';

const NavigationBar = props =>{ 
   
    const[sidebar, setSidebar]= useState(false);
    const[userImage, changeUserImage] = useState("//ssl.gstatic.com/accounts/ui/avatar_2x.png");
    const showSidebar = () => setSidebar(!sidebar);
    const navigate = useNavigate();

    const LoggingOut =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('u');
        localStorage.removeItem('confirmed');
        localStorage.removeItem('typeOfUser');
        localStorage.removeItem('imageBase64');
        console.log('obrisano');
        navigate("/login");
    }   
    useEffect(() => {
        const logoutTimer = setTimeout(() => {
            alert("Session expired, login again!");
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('u');
            localStorage.removeItem('confirmed');
            localStorage.removeItem('typeOfUser');
            localStorage.removeItem('imageBase64');
            navigate('/login');
        }, 50 * 60 * 1000); // 50 minutes
        changeUserImage(`data:image/jpeg;base64,${localStorage.getItem('imageBase64')}`);
        return () => clearTimeout(logoutTimer); 
        
        
    }, [navigate]);
    useEffect(() => {
        changeUserImage(`data:image/jpeg;base64,${localStorage.getItem('imageBase64')}`);
        
    }, [sidebar]);
    const OpenCart = () =>{
    }

    return<>
        <IconContext.Provider value={{color:'#fff'}}>
        <div className="navbar">
            <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar}/>
              
            </Link>
            <h1 className="Naslov">E-shop</h1>
            {/*
             <img id="profile-img"  className="profile-img-card-navbar" src={`data:image/jpeg;base64,${localStorage.getItem('imageBase64')}`} alt="Selected Image" />
            */}
            
            
            <Link to="/login" className="log-out" onClick={LoggingOut}>
                Logout
            </Link>
           
        </div>  
        <nav className={sidebar ? 'nav-bar active' : 'nav-bar'}>
            <ul className="nav-bar-items" onClick={showSidebar}>
                <li className="nav-bar-toggle">
                    <Link to="#" className="menu-bar">
                    <AiIcons.AiOutlineClose />
                    </Link>
                   
                </li>
                
                {/*
                <li>
                     <img id="profile-img"  className="profile-img-card-navbar" src={userImage} alt="Selected Image" />
                </li>
                 */}
                
                {SidebarData.map((item,index) => {
                     return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path} >
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                     )
                })}
                {

                    AdminData.map((item,index) => {
                        if(localStorage.getItem('typeOfUser') === "Administrator"){
                            return (
                           <li key={index} className={item.cName}>
                               <Link to={item.path} >
                                   {item.icon}
                                   <span>{item.title}</span>
                               </Link>
                           </li>
                            )
                        }
                        
                   })
                
                }
                {

                    SellerData.map((item,index) => {
                        if(localStorage.getItem('typeOfUser') === "Seller"){
                            return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                            )
                        }           
    
                    })

                }
                {

                    SellerVerifiedData.map((item,index) => {
                    if(localStorage.getItem('typeOfUser') === "Seller" && localStorage.getItem('confirmed') === "Accepted"){
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    }           

                    })

                }

                {

                    BuyerData.map((item,index) => {
                        if(localStorage.getItem('typeOfUser') === "Buyer"){
                            return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                            )
                        }           
    
                    })

                }    

                
            </ul>
        </nav>
        </IconContext.Provider>
    </>;
}

export default NavigationBar;