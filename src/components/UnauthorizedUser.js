import React from "react";
import "./css/UnauthorizedUser.css"
import NavigationBar from "./NavigationBar";
import { AcceptedData, DeniedData, PendingData } from "./data/MessageData";

const UnauthorizedUser = (props) =>{
   
    return <>
    <NavigationBar/>
    <div className="centered-div">
        {

        PendingData.map((item) => {
            if(localStorage.getItem('confirmed') === "Pending"){
                return (<>
                 {item.icon}
                    <span><h1>{item.message}</h1></span>
                </>
                   
                )
            }           

        })
        }

        {
        AcceptedData.map((item) => {
            if(localStorage.getItem('confirmed') === "Accepted"){
                return (<>
                 {item.icon}
                    <span><h1>{item.message}</h1></span>
                </>
                   
                )
            }           

        })
        }

        {
        DeniedData.map((item) => {
            if(localStorage.getItem('confirmed') === "Declined"){
                return (<>
                    {item.icon}
                    <span><h1>{item.message}</h1></span>
                </>
           
                )
            }           

        })  
        }
    </div>
    </>;
}

export default UnauthorizedUser;