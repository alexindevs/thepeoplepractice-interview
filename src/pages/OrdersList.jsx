import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserOrders } from '../api/orders';
import { useNavigate } from 'react-router-dom';

const OrdersList = () => {
  const { token, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const handleUnauthorizedError = async () => {
      await logout();
      localStorage.removeItem('token');
      navigate('/login');
    };

    const fetchOrders = async () => {
      try {
        const response = await getUserOrders(token);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        
        if (error.response?.status === 401 || 
            error.message?.toLowerCase().includes('unauthorized')) {
          await handleUnauthorizedError();
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate, logout]);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-2xl flex justify-between mb-4">
        <button
          onClick={() => navigate('/orders/create')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Create New Order
        </button>
        <button 
          onClick={logout} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      
      {isLoading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Product</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center hover:bg-gray-50">
                  <td className="border p-2">{order.productName}</td>
                  <td className="border p-2">{order.productCategory}</td>
                  <td className="border p-2">${order.price.toFixed(2)}</td>
                  <td className="border p-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
