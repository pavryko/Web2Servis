import React,{useState,useEffect} from "react";
import NavigationBar from "./NavigationBar";
import { GetPreviousOrders, GetActiveOrders,CancelOrder,GetWaitingOrders } from "../services/OrderService";
import * as FcIcons from 'react-icons/fc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './css/toast.css';
import './css/BuyerPrevOrders.css';


const PreviousOrders = () =>{
    const[previousOrders, changePreviousOrders] = useState([]);
    const[activeOrders, changeActiveOrders] = useState([]);
    const[ordersOnWait, changeOrdersOnWait] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userId = localStorage.getItem('id');
            const data = await GetPreviousOrders(userId);
            changePreviousOrders(data);
            const data2 = await GetActiveOrders(userId);
            changeActiveOrders(data2);
            const data3 = await GetWaitingOrders(userId);
            changeOrdersOnWait(data3);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        }
        fetchData();
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        const updatedOrders = activeOrders.map(order => {
          const remainingTime = new Date(order.orderExpiration).getTime() - new Date().getTime();
          return {
            ...order,
            remainingTime: remainingTime > 0 ? remainingTime : 0
          };
        });
        console.log('menja se');
        changeActiveOrders(updatedOrders);
      }, 1000);
      console.log('menja se');
      console.log(activeOrders);
      /*
      const fetchData = async () => {
        try {
          const userId = localStorage.getItem('id');
          const data = await GetPreviousOrders(userId);
          changePreviousOrders(data);
          const data2 = await GetActiveOrders(userId);
          changeActiveOrders(data2);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
      fetchData();*/ 
      return () => clearInterval(interval);
    }, [activeOrders]);

    const cancelOrder = (orderId) => {
      console.log(orderId);
      const mess = CancelOrder(orderId);
      toast.info(mess, {
        position: "top-right",
        autoClose: 3000,
        className: 'custom-toast',
      });
     
    };
    const isOrderCancelable = (timestamp) => {
      
      const currentTime = new Date().getTime();
      const orderTime = new Date(timestamp).getTime();
      const timeDifference = currentTime - orderTime;
      return timeDifference < 3600000;
    };

    return<>
        <NavigationBar/>
        <div className="orders-container">
          <div className="active-orders">
            <h2>Orders on wait:</h2>
            {ordersOnWait.map(order => (
              <div className="order-box2" key={order.id}>
                 <h3>Order ID: {order.id}</h3>
             
              <p>Order date: {formatDate(order.orderDate)}</p>
              <p>Address: {order.address}</p>
              <p>Comment: {order.comment}</p>
              <p>Deliver time: {formatDate(order.orderExpiration)}</p>
              
              <h4>Products:</h4>
              <ul>
                {order.orderProducts.map(product => (
                <li key={product.productId}>
                   Product name: {product.productName}, Product price: {product.productPrice}, Quantity: {product.quantity}
                </li>
                ))}
              </ul>
              
              </div>
            ))}
          </div>
          <div className="active-orders">
            <h2>Active orders:</h2>
            {activeOrders.map(order => (
              <div className="order-box2" key={order.id}>
                 <h3>Order ID: {order.id}</h3>
             
              <p>Order date: {formatDate(order.orderDate)}</p>
              <p>Address: {order.address}</p>
              <p>Comment: {order.comment}</p>
              <p>Deliver time: {formatDate(order.orderExpiration)}</p>
              <p>Remaining time to delivery: {formatTime(order.remainingTime)}</p>
              <h4>Products:</h4>
              <ul>
                {order.orderProducts.map(product => (
                <li key={product.productId}>
                   Product name: {product.productName}, Product price: {product.productPrice}, Quantity: {product.quantity}
                </li>
                ))}
              </ul>
              <div className="cancel-button-container">
                {isOrderCancelable(order.orderDate) && (
                <button className="cancel-button" onClick={() => cancelOrder(order.id)}>
                  <FcIcons.FcCancel />
                </button>
                )}
              </div>
              </div>
            ))}
          </div>
      <div className="previous-orders">
        <h2>Previous orders:</h2>
        {previousOrders.map(order => (
          <div className="order-box" key={order.id}>
            <h3>Order ID: {order.id}</h3>
             
              <p>Address: {order.address}</p>
              <p>Comment: {order.comment}</p>
              <h4>Products:</h4>
              <ul>
                {order.orderProducts.map(product => (
                <li key={product.productId}>
                   Product name: {product.productName}, Product price: {product.productPrice}, Quantity: {product.quantity}
                </li>
                ))}
              </ul>
          </div>
        ))}
      </div>
    </div>




        
    </>
}

export default PreviousOrders;

const formatDate = (dateTime) => {
  return new Date(dateTime).toLocaleString('en-US');
};
const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};