import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#2563EB", "#A78BFA", "#06B6D4", "#EAB308", "#EF4444"];

const CustomTooltip = ({ active, payload, totalOrders }) => {
  if (active && payload && payload.length && totalOrders > 0) {
    const percentage = ((payload[0].value / totalOrders) * 100).toFixed(2);

    return (
      <div className="bg-white px-3 py-1 rounded-lg shadow-md text-sm font-bold">
        {`${payload[0].name}: ${percentage}%`}
      </div>
    );
  }
  return null;
};

const OrdersByCategoryChart = ({ ordersByCategory, totalOrders }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow relative">
        <h3 className="text-lg text-[#64748B] font-semibold mt-10">
            Orders by categories
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-evenly md:items-end">
          <div className="relative flex items-center justify-center">
            <div className="absolute text-center">
              <p className="text-gray-500 text-sm">Total</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
    
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={ordersByCategory}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  stroke="none"
                  paddingAngle={2}
                >
                  {ordersByCategory.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      style={{
                        transition: "transform 0.3s ease-out",
                        transformOrigin: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.1)";
                        e.target.style.filter = `drop-shadow(2px 10px 25px rgba(71, 85, 105, 0.20))`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.filter = "none";
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip totalOrders={totalOrders} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
    
          <div className="md:w-1/3 flex flex-col justify-center md:justify-start mt-4 md:mt-0">
            {ordersByCategory.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <p className="text-sm text-gray-600">{entry._id}</p>
              </div>
            ))}
          </div>
        </div>
          
    </div>
  );
};

export default OrdersByCategoryChart;
