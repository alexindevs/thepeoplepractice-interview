import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../api/orders';
import { useNavigate } from 'react-router-dom';

const OrderCreation = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    productName: '',
    productCategory: '',
    price: 0,
    orderDate: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createOrder(
        { ...formData, price: Number(formData.price) },
        token
      );
      alert('Order created successfully!');
      setFormData({
        customerName: '',
        productName: '',
        productCategory: '',
        price: 0,
        orderDate: '',
      });
      navigate('/orders');
    } catch (error) {
      alert('Failed to create order. Please try again.');
      console.error('Order submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "price") {
      value = Number(value);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-lg flex justify-end mb-4">
        <button 
          onClick={logout} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      <div className="w-full max-w-lg bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Create New Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md bg-white"
          >
            <option value="" disabled>Select product category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
            <option value="books">Books</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full p-2 border rounded-md"
          />
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md" disabled={isLoading}>
            {isLoading ? 'Creating order...' : 'Create Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderCreation;
