import { useEffect, useState } from "react";
import { getAllOrders } from "../api/orders"; 
import { useAuth } from "../contexts/AuthContext";
import { MoreHorizontal } from "lucide-react";
import Checkbox from "./Checkbox"; 
import Pagination from "./Pagination";

const Orders = (({ currentPage, totalPages, setCurrentPage, setTotalPages }) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const data = await getAllOrders(token, currentPage);
        setOrders(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token, currentPage, setTotalPages]);


  const toggleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === orders.length ? [] : orders.map((order) => order._id)
    );
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl mt-6">
      <h3 className="text-lg font-semibold my-6 text-[#64748B]">Orders</h3>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="flex items-center bg-[#F8FAFC] rounded p-4">
            <div className="w-[32px] mr-3">
              <Checkbox checked={selectedOrders.length === orders.length && orders.length > 0} onChange={toggleSelectAll} />
            </div>
            <div className="flex-1 text-sm font-medium text-[#64748B]">Customer name</div>
            <div className="flex-1 text-sm font-medium text-[#64748B]">Product name</div>
            <div className="flex-1 text-sm font-medium text-[#64748B]">Category</div>
            <div className="flex-1 text-sm font-medium text-[#64748B]">Date</div>
            <div className="flex-1 text-sm font-medium text-[#64748B]">Price</div>
            <div className="w-[40px]"></div>
          </div>

          {isLoading && <p className="text-gray-500 text-sm py-4">Loading orders...</p>}

          {!isLoading && orders.length === 0 && (
            <p className="text-gray-500 text-sm py-4">No orders found.</p>
          )}

          {orders.map((order) => (
            <div key={order._id} className="flex items-center border-b border-gray-50 hover:bg-gray-50 transition-colors px-4">
              <div className="w-[32px] mr-3 py-4">
                <Checkbox checked={selectedOrders.includes(order._id)} onChange={() => toggleSelectOrder(order._id)} />
              </div>
              <div className="flex-1 py-4 text-sm">{order.customerName}</div>
              <div className="flex-1 py-4 text-sm">{order.productName}</div>
              <div className="flex-1 py-4 text-sm">{order.productCategory}</div>
              <div className="flex-1 py-4 text-sm">{new Date(order.orderDate).toLocaleDateString("en-US")}</div>
              <div className="flex-1 py-4 text-sm">${order.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="w-[40px] py-4">
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
    </div>
  );
});
export default Orders;
