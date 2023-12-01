

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminOrders from './AdminOrders';
import AdminSidebar from '../../components/Admin/SideBar/AdminSidebar';
import AdminTopbar from '../../components/Admin/TopBar/AdminTopbar';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders from AdminOrders (assuming AdminOrders returns orders with trackingNumber)
        const adminOrdersResponse = await AdminOrders.fetchOrders();
        setOrders(adminOrdersResponse.data);
      } catch (error) {
        console.error('Error fetching orders from AdminOrders:', error);
      }
    };

    fetchOrders();
  }, []);

  const trackShipment = async (orderId, trackingNumber) => {
    try {
      // Call Shiprocket API to track shipment
      const shiprocketResponse = await axios.get(
        `https://apiv2.shiprocket.in/v1/external/courier/track?order_id=${orderId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer SHIPROCKET_API_KEY`,
          },
        }
      );

      // Log the Shiprocket API response
      console.log('Shiprocket API Response:', shiprocketResponse.data);

      // Display the shipment tracking details
      const shipmentDetails = shiprocketResponse.data;
      console.log('Shipment Details:', shipmentDetails);

      // Handle the Shiprocket API response and update the UI accordingly
      const shipmentStatus = shipmentDetails.current_status;
      console.log(`Shipment status for order ${orderId}: ${shipmentStatus}`);
    } catch (error) {
      console.error('Error tracking shipment with Shiprocket:', error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar name="Track" />

      <div className="flex-grow p-8">
        <AdminTopbar />

        <h1 className="text-2xl font-bold mb-4">Track Customer Order</h1>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Invoice no</th>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Shipment Number</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.orderNumber}</td>
                <td className="py-2 px-4 border-b">{order.customerDetails}</td>
                <td className="py-2 px-4 border-b">{order.shipmentNumber}</td>
                <td className="py-2 px-4 border-b">
                  {order.status === 'pending' && (
                    <span className="text-yellow-500">Pending</span>
                  )}
                  {order.status === 'delivered' && (
                    <span className="text-green-500">Delivered</span>
                  )}
                  {order.status === 'dispatched' && (
                    <span className="text-blue-500">Dispatched</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => trackShipment(order.id, order.trackingNumber)}
                  >
                    Track Shipment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagementPage;
