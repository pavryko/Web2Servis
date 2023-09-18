import React,{useState, useEffect} from "react";
import "./css/AdminAllOrders.css"
import NavigationBar from "./NavigationBar";
import { GetAllActiveOrders, GetAllCanceledOrders, GetAllPreviousOrders, GetAllNotTakenOrders } from "../services/OrderService";

const AllOrders = () =>{
    const[previousOrders, changePreviousOrders] = useState([]);
    const[activeOrders, changeActiveOrders] = useState([]);
    const[canceledOrders, changeCanceledOrders] = useState([]);
    const[notTakenOrders, changeNotTakenOrders] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            
            const data = await GetAllActiveOrders();
            changeActiveOrders(data);
            const data2 = await GetAllCanceledOrders();
            changeCanceledOrders(data2);
            const data3 = await GetAllPreviousOrders();
            changePreviousOrders(data3);
            const data4 = await GetAllNotTakenOrders();
            changeNotTakenOrders(data4);
            
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
  
        changeActiveOrders(updatedOrders);
      }, 1000);
      return () => clearInterval(interval);
    }, [activeOrders]);

    return <>
      <NavigationBar/>
      <div className="orders-container">
      <div className="orders-column">
            <h2>Not taken orders:</h2>
            {notTakenOrders.map(order => (
              <div className="order-item" key={order.id}>
                <h3>Order ID: {order.id}</h3>
                <p>User ID: {order.userId}</p>
                <p>Order date: {formatDate(order.orderDate)}</p>
                <p>Address: {order.address}</p>
                <p>Comment: {order.comment}</p>
                <p>Price: {order.price}€</p>
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
        <div className="orders-column">
            <h2>Active orders:</h2>
            {activeOrders.map(order => (
              <div  className="order-item"  key={order.id}>
                <h3>Order ID: {order.id}</h3>
                <p>User ID: {order.userId}</p>
                <p>Order date: {formatDate(order.orderDate)}</p>
                <p>Address: {order.address}</p>
                <p>Comment: {order.comment}</p>
                <p>Deliver time: {formatDate(order.orderExpiration)}</p>
                <p>Remaining time to delivery: {formatTime(order.remainingTime)}</p>
                <p>Price: {order.price}€</p>
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
      <div className="orders-column">
            <h2>Canceled orders:</h2>
            {canceledOrders.map(order => (
              <div  className="order-item"  key={order.id}>
                <h3>Order ID: {order.id}</h3>
                <p>User ID: {order.userId}</p>
                <p>Order date: {formatDate(order.orderDate)}</p>
                <p>Address: {order.address}</p>
                <p>Comment: {order.comment}</p>
                <p>Price: {order.price}€</p>
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
      <div className="orders-column">
            <h2>Previous orders:</h2>
            {previousOrders.map(order => (
              <div className="order-item"  key={order.id}>
                <h3>Order ID: {order.id}</h3>
                <p>User ID: {order.userId}</p>
                <p>Order date: {formatDate(order.orderDate)}</p>
                <p>Address: {order.address}</p>
                <p>Comment: {order.comment}</p>
                <p>Deliver time: {formatDate(order.orderExpiration)}</p>
                <p>Price: {order.price}€</p>
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

export default AllOrders;
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
