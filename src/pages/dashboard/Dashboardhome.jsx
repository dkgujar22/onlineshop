import React, { useEffect, useState } from 'react';
import {
  FiDollarSign,
  FiShoppingBag,
  FiBox,
  FiUsers,
} from 'react-icons/fi';
import { useOrder } from '../../context/OrderContext';
import { supabase } from '../../supabaseClient';

const Dashboardhome = () => {
  const { orders } = useOrder();
  const [products, setProducts] = useState([]);

  const uniqueCustomers = [
  ...new Map(
    orders?.map((order) => [order.user_id, order])
  ).values()
];

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
      value: uniqueCustomers.length,
      icon: <FiUsers size={22} />,
      bg: 'bg-info-subtle',
      text: 'text-info'
    }
  ];

 
  return (
    <div className="container-fluid px-4 py-4">

  {/* Header */}
  <div className="mb-4">
    <h1 className="fw-bold mb-1">
      Welcome back, Admin
    </h1>

    <p className="text-muted mb-0">
      Here is what is happening with your store today.
    </p>
  </div>

  {/* Stats */}
  <div className="row g-4">

    {stats.map((stat, index) => (
      <div
        key={index}
        className="col-12 col-sm-6 col-xl-3"
      >
        <div className="card border-0 shadow-sm rounded-4 h-100">
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center">

              {/* Text */}
              <div>
                <p className="text-muted mb-2 small fw-semibold">
                  {stat.title}
                </p>

                <h3 className="fw-bold mb-0">
                  {stat.value}
                </h3>
              </div>

              {/* Icon */}
              <div
                className={`${stat.bg} ${stat.text} rounded-4 p-3 d-flex align-items-center justify-content-center`}
              >
                {stat.icon}
              </div>

            </div>

          </div>
        </div>
      </div>
    ))}

  </div>

</div>
  );
};

export default Dashboardhome;