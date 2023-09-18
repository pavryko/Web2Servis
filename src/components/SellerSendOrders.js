import React, { useState , useEffect} from "react";
import { GetWaitingOrdersSeller, SendOrder } from "../services/OrderService";
import NavigationBar from "./NavigationBar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './css/SellerSendOrder.css';
import './css/toast.css';

const SendOrders = () => { 
    const [waitingOrders, changeWaitingOrders] = useState([]);

    useEffect(() => {
        const fetchUnclaimedPackages = async () => {
          try {
            const userId = localStorage.getItem('id');
            const response = await GetWaitingOrdersSeller(userId);
            console.log(response);
            changeWaitingOrders(response);
          } catch (error) {
            console.error("Error fetching unclaimed packages:", error);
          }
        };
    
        fetchUnclaimedPackages();
      }, []);

  const sendOrder = async (orderId) => {
    try {
      // Send the order using the SendOrder function
      await SendOrder(orderId);

      // Update the waitingOrders state to remove the sent order
      changeWaitingOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );

      toast.info('Order successfully sent!', {
        position: "top-right",
        autoClose: 3000,
        className: 'custom-toast',
      });
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };
    
    return (<>
    
        <NavigationBar/>
        <div className="order-container">
        {waitingOrders.map((order) => (
          <div key={order.id} className="order-item">
            <h3>Order ID: {order.id}</h3>
            <p>User ID: {order.userId}</p>
            <p>Order Date: {formatDate(order.orderDate)}</p>
            <p>Address: {order.address}</p>
            <p>Comment: {order.comment}</p>
            <p>Price: {order.price}€</p>
            <button onClick={() => sendOrder(order.id)}>Send Order</button>
          </div>
        ))}
      </div>
        </>
    );
};

export default SendOrders;

const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US');
};