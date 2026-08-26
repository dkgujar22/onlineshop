import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  FiDollarSign,
  FiShoppingBag,
  FiBox,
  FiUsers,
  FiPlus,
  FiArrowRight
} from 'react-icons/fi';
import { useOrder } from '../../context/OrderContext';
import { supabase } from '../../supabaseClient';

const Dashboardhome = () => {
  const { orders } = useOrder();
  const [products, setProducts] = useState([]);

  const deliverOrders = orders?.filter(
    (ord) => ord.status === 'delivered'
  );

  const totalRevenue = deliverOrders?.reduce(
    (sum, ord) => sum + Number(ord.total_amount),
    0
  );

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase
        .from('admin_table')
        .select();

      if (!error) {
        setProducts(data);
      }
    };

    getProducts();
  }, []);

  const totalOrders = orders?.length || 0;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue === undefined ? 'loading...' : totalRevenue.toFixed(2)}`,
      icon: <FiDollarSign size={22} />,
      bg: 'bg-success-subtle',
      text: 'text-success'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: <FiShoppingBag size={22} />,
      bg: 'bg-primary-subtle',
      text: 'text-primary'
    },
    {
      title: 'Active Products',
      value: products.length,
      icon: <FiBox size={22} />,
      bg: 'bg-warning-subtle',
      text: 'text-warning'
    },
    {
      title: 'Total Customers',
      value: '1,205',
      icon: <FiUsers size={22} />,
      bg: 'bg-info-subtle',
      text: 'text-info'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      text: 'New order #ORD-9021 received',
      time: '10 minutes ago',
      type: 'order'
    },
    {
      id: 2,
      text: 'Product "Mechanical Keyboard" stock updated',
      time: '1 hour ago',
      type: 'product'
    },
    {
      id: 3,
      text: 'New customer account created',
      time: '3 hours ago',
      type: 'user'
    },
    {
      id: 4,
      text: 'Order #ORD-9018 shipped successfully',
      time: '5 hours ago',
      type: 'order'
    }
  ];

  return (
    <div className="container-fluid">

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

        <div>
          <h1 className="fw-bold mb-1">
            Welcome back, Admin 👋
          </h1>

          <p className="text-muted mb-0">
            Here is what is happening with your store today.
          </p>
        </div>

        <Link
          to="/dashboard/addproduct"
          className="btn btn-primary mt-3 mt-md-0 d-flex align-items-center gap-2"
        >
          <FiPlus />
          Add New Product
        </Link>

      </div>

      {/* Stats */}
      <div className="row g-4 mb-4">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-xl-3"
          >
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                  <div>
                    <p className="text-muted mb-2">
                      {stat.title}
                    </p>

                    <h3 className="fw-bold mb-0">
                      {stat.value}
                    </h3>
                  </div>

                  <div
                    className={`${stat.bg} ${stat.text} rounded-3 p-3`}
                  >
                    {stat.icon}
                  </div>

                </div>

              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Main Content */}
      <div className="row g-4">

        {/* Quick Actions */}
        <div className="col-12 col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 pt-4 px-4">
              <h5 className="fw-bold mb-0">
                Quick Actions
              </h5>
            </div>

            <div className="card-body px-4">

              {/* Add Product */}
              <Link
                to="/dashboard/addproduct"
                className="text-decoration-none text-dark"
              >
                <div className="d-flex justify-content-between align-items-center border-bottom py-3">

                  <div className="d-flex align-items-center gap-3">

                    <div className="bg-primary-subtle text-primary rounded-3 p-2">
                      <FiPlus size={20} />
                    </div>

                    <div>
                      <strong className="d-block">
                        Add New Product
                      </strong>

                      <small className="text-muted">
                        Upload new inventory items to your catalog
                      </small>
                    </div>

                  </div>

                  <FiArrowRight className="text-muted" />

                </div>
              </Link>

              {/* Manage Products */}
              <Link
                to="/dashboard/showproducts"
                className="text-decoration-none text-dark"
              >
                <div className="d-flex justify-content-between align-items-center border-bottom py-3">

                  <div className="d-flex align-items-center gap-3">

                    <div className="bg-warning-subtle text-warning rounded-3 p-2">
                      <FiBox size={20} />
                    </div>

                    <div>
                      <strong className="d-block">
                        Manage Products
                      </strong>

                      <small className="text-muted">
                        Edit prices, update stock, or remove items
                      </small>
                    </div>

                  </div>

                  <FiArrowRight className="text-muted" />

                </div>
              </Link>

              {/* Orders */}
              <Link
                to="/dashboard/orders"
                className="text-decoration-none text-dark"
              >
                <div className="d-flex justify-content-between align-items-center py-3">

                  <div className="d-flex align-items-center gap-3">

                    <div className="bg-success-subtle text-success rounded-3 p-2">
                      <FiShoppingBag size={20} />
                    </div>

                    <div>
                      <strong className="d-block">
                        View Orders
                      </strong>

                      <small className="text-muted">
                        Check customer orders and shipping statuses
                      </small>
                    </div>

                  </div>

                  <FiArrowRight className="text-muted" />

                </div>
              </Link>

            </div>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="col-12 col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 pt-4 px-4">
              <h5 className="fw-bold mb-0">
                Recent Store Activity
              </h5>
            </div>

            <div className="card-body px-4">

              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="d-flex gap-3 py-3 border-bottom"
                >

                  <div
                    className={`rounded-circle bg-primary`}
                    style={{
                      width: '10px',
                      height: '10px',
                      marginTop: '7px',
                      flexShrink: 0
                    }}
                  ></div>

                  <div>
                    <p className="mb-1 fw-semibold">
                      {activity.text}
                    </p>

                    <small className="text-muted">
                      {activity.time}
                    </small>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboardhome;