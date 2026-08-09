// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../supabaseClient';
// // import '../AdminOrders.css'

// // Mock initial orders data
// const initialOrders = [
//   {
//     id: 'ORD-1001',
//     date: '2026-08-08',
//     customer: {
//       name: 'Jane Doe',
//       phone: '+1 (555) 000-0000',
//       address: '1234 Main St, Apt 4B',
//       city: 'San Francisco',
//       postalCode: '94103',
//     },
//     items: [
//       { name: 'Wireless Headphones', price: 149.99, quantity: 1 },
//       { name: 'Mechanical Keyboard', price: 89.50, quantity: 2 },
//     ],
//     total: 328.99,
//     status: 'Delivered',
//   },
//   {
//     id: 'ORD-1002',
//     date: '2026-08-09',
//     customer: {
//       name: 'John Smith',
//       phone: '+1 (555) 234-5678',
//       address: '742 Evergreen Terrace',
//       city: 'Springfield',
//       postalCode: '97477',
//     },
//     items: [
//       { name: 'Gaming Mouse', price: 59.99, quantity: 1 },
//     ],
//     total: 59.99,
//     status: 'Pending',
//   },
//   {
//     id: 'ORD-1003',
//     date: '2026-08-09',
//     customer: {
//       name: 'Sarah Connor',
//       phone: '+1 (555) 987-6543',
//       address: '100 Cyberdyne Way',
//       city: 'Los Angeles',
//       postalCode: '90001',
//     },
//     items: [
//       { name: '4K Monitor 27"', price: 349.00, quantity: 1 },
//       { name: 'HDMI Cable 6ft', price: 12.99, quantity: 2 },
//     ],
//     total: 374.98,
//     status: 'Processing',
//   },
//   {
//     id: 'ORD-1004',
//     date: '2026-08-07',
//     customer: {
//       name: 'Michael Brown',
//       phone: '+1 (555) 345-6789',
//       address: '456 Oak Avenue',
//       city: 'Chicago',
//       postalCode: '60601',
//     },
//     items: [
//       { name: 'USB-C Docking Station', price: 120.00, quantity: 1 },
//     ],
//     total: 120.00,
//     status: 'Cancelled',
//   },
// ];

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [selectedOrder, setSelectedOrder] = useState(null);

//  useEffect(async()=>{
//       const {data:orderdata}=await supabase.from('orders').select();
//       setOrders(orderdata)
//  },[])
  

//   // Filter orders based on search input and status selector
//   const filteredOrders = orders?.filter((order) => {
//     const matchesSearch =
//       order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.customer.city.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === 'All' || order.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   // Update order status directly from admin panel
//   const handleStatusChange = (orderId, newStatus) => {
//     setOrders((prev) =>
//       prev.map((ord) =>
//         ord.id === orderId ? { ...ord, status: newStatus } : ord
//       )
//     );
//     if (selectedOrder && selectedOrder.id === orderId) {
//       setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
//     }
//   };

//   // Metric stats
//   const totalRevenue = orders
//     .filter((o) => o.status !== 'Cancelled')
//     .reduce((sum, o) => sum + o.total, 0);

//   return (
//     <div className="admin-container">
//       <div className="admin-header">
//         <h2>Orders Management Dashboard</h2>
//         <p>View and manage customer orders</p>
//       </div>

//       {/* Overview Stats */}
//       <div className="stats-grid">
//         <div className="stat-card">
//           <span className="stat-label">Total Orders</span>
//           <span className="stat-value">{orders.length}</span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-label">Pending Orders</span>
//           <span className="stat-value warning">
//             {orders.filter((o) => o.status === 'Pending').length}
//           </span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-label">Delivered</span>
//           <span className="stat-value success">
//             {orders.filter((o) => o.status === 'Delivered').length}
//           </span>
//         </div>
//         <div className="stat-card">
//           <span className="stat-label">Net Revenue</span>
//           <span className="stat-value">${totalRevenue.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Filter & Search Bar */}
//       <div className="controls-bar">
//         <input
//           type="text"
//           placeholder="Search by Order ID, Name, or City..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="status-select"
//         >
//           <option value="All">All Statuses</option>
//           <option value="Pending">Pending</option>
//           <option value="Processing">Processing</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//       </div>

//       {/* Orders Table */}
//       <div className="table-wrapper">
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Date</th>
//               <th>Customer Name</th>
//               <th>Location</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((order) => (
//                 <tr key={order.id}>
//                   <td className="font-bold">{order.id}</td>
//                   <td>{order.date}</td>
//                   <td>{order.customer.name}</td>
//                   <td>{order.customer.city}</td>
//                   <td className="font-bold">${order.total.toFixed(2)}</td>
//                   <td>
//                     <select
//                       value={order.status}
//                       onChange={(e) =>
//                         handleStatusChange(order.id, e.target.value)
//                       }
//                       className={`badge-select badge-${order.status.toLowerCase()}`}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Processing">Processing</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => setSelectedOrder(order)}
//                       className="view-btn"
//                     >
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="no-data">
//                   No orders found matching your criteria.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
//           <div
//             className="modal-card"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-header">
//               <h3>Order Details ({selectedOrder.id})</h3>
//               <button
//                 className="close-btn"
//                 onClick={() => setSelectedOrder(null)}
//               >
//                 &times;
//               </button>
//             </div>

//             <div className="modal-body">
//               {/* Customer Info Section */}
//               <div className="modal-section">
//                 <h4>Customer Information</h4>
//                 <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
//                 <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
//                 <p>
//                   <strong>Shipping Address:</strong>{' '}
//                   {selectedOrder.customer.address}, {selectedOrder.customer.city},{' '}
//                   {selectedOrder.customer.postalCode}
//                 </p>
//               </div>

//               {/* Items List Section */}
//               <div className="modal-section">
//                 <h4>Purchased Items</h4>
//                 <ul className="modal-item-list">
//                   {selectedOrder.items.map((item, idx) => (
//                     <li key={idx} className="modal-item">
//                       <span>
//                         {item.name} <strong>x{item.quantity}</strong>
//                       </span>
//                       <span>${(item.price * item.quantity).toFixed(2)}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Summary */}
//               <div className="modal-summary">
//                 <span>Total Amount Paid:</span>
//                 <span className="modal-total">
//                   ${selectedOrder.total.toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React from 'react'

const Orders = () => {
  return (
    <div>
      
    </div>
  )
}

export default Orders
