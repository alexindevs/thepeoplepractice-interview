import { useState } from 'react';
import RevenueTrendChart from './RevenueTrend';
import OrdersByCategoryChart from './OrdersByCategory';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-1 rounded-lg shadow-md text-sm font-bold">
          {`${payload[0].name}: ${payload[0].value}%`}
        </div>
      );
    }
    return null;
  };

const Charts = ({ revenueTrend, ordersByCategory, totalOrders }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDotClick = (data, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-18">
      <RevenueTrendChart revenueTrend={revenueTrend} />

      <OrdersByCategoryChart ordersByCategory={ordersByCategory} totalOrders={totalOrders} />
    </div>
  );
};

export default Charts;
