import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders`;

export const createOrder = async (orderData, token) => {
  const response = await axios.post(API_URL, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserOrders = async (token) => {
  const response = await axios.get(`${API_URL}/my-orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllOrders = async (token, page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit },
  });
  return response.data;
};


export const deleteOrder = async (orderId, token) => {
  const response = await axios.delete(`${API_URL}/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
