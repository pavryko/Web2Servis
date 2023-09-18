import React,{useState} from "react";
import { FcProcess, FcOk , FcCancel} from "react-icons/fc";

export const PendingData =[
    {
        message:'The request is being processed...',
        icon: <FcProcess className="icon"></FcProcess>
       
    }
]
export const AcceptedData =[
    {
        message:'The request is accepted.',
        icon: <FcOk className="icon"></FcOk>
       
    }
]
export const DeniedData =[
    {
        message:'The request was denied.',
        icon: <FcCancel className="icon"></FcCancel>
       
    }
]

