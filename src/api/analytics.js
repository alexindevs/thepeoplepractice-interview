import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/analytics`;

export const getDashboardData = async (token, timeframe) => {
  const headers = { Authorization: `Bearer ${token}` };

  const [revenueRes, ordersRes, customersRes, trendRes, categoryRes] = await Promise.all([
    axios.get(`${API_URL}/revenue?timeframe=${timeframe}`, { headers }),
    axios.get(`${API_URL}/orders-count?timeframe=${timeframe}`, { headers }),
    axios.get(`${API_URL}/customers-count?timeframe=${timeframe}`, { headers }),
    axios.get(`${API_URL}/revenue-trend`, { headers }),
    axios.get(`${API_URL}/orders-by-category?timeframe=${timeframe}`, { headers }),
  ]);

  const data = {
    totalRevenue: revenueRes.data.data || {},
    totalOrders: ordersRes.data.data || {},
    totalCustomers: customersRes.data.data || {},
    revenueTrend: trendRes.data.data || [],
    ordersByCategory: categoryRes.data.data || [],
  };
  console.log(data);
  return data;
};

