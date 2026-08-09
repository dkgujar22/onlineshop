import React from 'react';
import { Link } from 'react-router';
import {
  FiDollarSign,
  FiShoppingBag,
  FiBox,
  FiUsers,
  FiPlus,
  FiArrowRight,
  FiTrendingUp
} from 'react-icons/fi';
import '../../css/Dashboardhomepage.css'

const Dashboardhome = () => {
  // Static Overview Data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,450.80',
      change: '+14.2%',
      isPositive: true,
      icon: <FiDollarSign />,
      colorClass: 'revenue'
    },
    {
      title: 'Total Orders',
      value: '384',
      change: '+8.1%',
      isPositive: true,
      icon: <FiShoppingBag />,
      colorClass: 'orders'
    },
    {
      title: 'Active Products',
      value: '45',
      change: '+2 new',
      isPositive: true,
      icon: <FiBox />,
      colorClass: 'products'
    },
    {
      title: 'Total Customers',
      value: '1,205',
      change: '+5.4%',
      isPositive: true,
      icon: <FiUsers />,
      colorClass: 'customers'
    }
  ];

  const recentActivities = [
    { id: 1, text: 'New order #ORD-9021 received', time: '10 minutes ago', type: 'order' },
    { id: 2, text: 'Product "Mechanical Keyboard" stock updated', time: '1 hour ago', type: 'product' },
    { id: 3, text: 'New customer account created', time: '3 hours ago', type: 'user' },
    { id: 4, text: 'Order #ORD-9018 shipped successfully', time: '5 hours ago', type: 'order' }
  ];

  return (
    <div className="dashboard-home-container">
      {/* Header Section */}
      <div className="dashboard-welcome-header">
        <div>
          <h1 className="welcome-title">Welcome back, Admin</h1>
          <p className="welcome-subtitle">
            Here is what is happening with your store overview today.
          </p>
        </div>
        <Link to="/dashboard/addproduct" className="primary-action-btn">
          <FiPlus />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Metrics / Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-header">
              <span className={`stat-icon ${stat.colorClass}`}>{stat.icon}</span>
              <span className={`stat-badge ${stat.isPositive ? 'positive' : 'negative'}`}>
                <FiTrendingUp /> {stat.change}
              </span>
            </div>
            <div className="stat-card-body">
              <span className="stat-title">{stat.title}</span>
              <h2 className="stat-value">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Content Layout Grid */}
      <div className="dashboard-content-grid">
        {/* Quick Actions Card */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions-list">
            <Link to="/dashboard/addproduct" className="quick-action-item">
              <div className="action-info">
                <FiPlus className="action-icon" />
                <div>
                  <strong>Add New Product</strong>
                  <p>Upload new inventory items to your catalog</p>
                </div>
              </div>
              <FiArrowRight className="arrow-icon" />
            </Link>

            <Link to="/dashboard/showproducts" className="quick-action-item">
              <div className="action-info">
                <FiBox className="action-icon" />
                <div>
                  <strong>Manage Products</strong>
                  <p>Edit prices, update stock, or remove items</p>
                </div>
              </div>
              <FiArrowRight className="arrow-icon" />
            </Link>

            <Link to="/dashboard/orders" className="quick-action-item">
              <div className="action-info">
                <FiShoppingBag className="action-icon" />
                <div>
                  <strong>View Orders</strong>
                  <p>Check customer orders and update shipping statuses</p>
                </div>
              </div>
              <FiArrowRight className="arrow-icon" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Recent Store Activity</h3>
          </div>
          <div className="activity-timeline">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-dot ${activity.type}`}></div>
                <div className="activity-details">
                  <p className="activity-text">{activity.text}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardhome;