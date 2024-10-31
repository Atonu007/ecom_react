import React, { useEffect, useState } from "react";


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/order/orders/history/", {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          const errorData = await response.json();
          setErrorMsg("Failed to fetch order history: " + errorData.detail);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
        setErrorMsg("An error occurred while fetching order history.");
      }
    };

    if (accessToken) {
      fetchOrderHistory();
    } else {
      setErrorMsg("Please log in to view your order history.");
    }
  }, [accessToken]);

  return (
    <div className="max-w-container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      {orders.length === 0 && !errorMsg && <p>No orders found.</p>}
      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded">
          <h2 className="font-semibold">Order ID: {order.id}</h2>
          <p>Date: {new Date(order.created_at).toLocaleDateString()}</p> 
          <p>Total: ${order.total_amount}</p> 
          <h3 className="font-semibold">Items:</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between space-x-2">
              <span>{item.product_name}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Price: ${item.price}</span>
            </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
