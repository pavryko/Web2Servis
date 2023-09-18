import React from "react";
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import { MdVerified } from "react-icons/md";

export const SidebarData =[
    {
        title:'Dashboard',
        path:'/dashboard',
        icon:<AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Profile',
        path:'/profile',
        icon:<AiIcons.AiFillProfile/>,
        cName:'nav-text'

    }
]

export const AdminData =[
    {
        title:'User control',
        path:'/acceptuser',
        icon:<FaIcons.FaUser/>,
        cName:'nav-text'
    },
    {
        title:'All orders made',
        path:'/allorders',
        icon:<AiIcons.AiOutlineShoppingCart/>,
        cName:'nav-text'
    }
]


export const SellerVerifiedData =[
    {
        title:'Products',
        path:'/products',
        icon:<AiIcons.AiOutlineInbox/>,
        cName:'nav-text'
    },
    {
        title:'Orders',
        path:'/orders',
        icon:<BsIcons.BsFillCartCheckFill/>,
        cName:'nav-text'
    },
    {
        title:'Send Orders',
        path:'/sendorders',
        icon:<FaIcons.FaMapMarkedAlt/>,
        cName:'nav-text'
    }
]
export const BuyerData =[
    {
        title:'Cart',
        path:'/cart',
        icon:<AiIcons.AiOutlineShoppingCart />,
        cName:'nav-text'
    },
    {
        title:'Orders',
        path:'/previousorders',
        icon:<BsIcons.BsFillCartCheckFill/>,
        cName:'nav-text'
    }
]   

export const SellerData =[
    {
    }
]
