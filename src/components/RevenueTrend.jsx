import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-sm font-semibold py-1.5 px-3 rounded-lg shadow-md">
        ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
    );
  }
  return null;
};

const RevenueTrendChart = ({ revenueTrend }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold my-10 text-[#64748B]">Revenue over time</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={revenueTrend}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(37, 99, 235, 0.15)" />
            <stop offset="95%" stopColor="rgba(37, 99, 235, 0.03)" />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="_id"
            tickFormatter={(month) =>
              ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1]
            }
            axisLine={{ stroke: "#F1F5F9" }}
            tickLine={false}
            tickMargin={10}
            tick={{ fill: "#64748B", dy: 6 }}
          />

          <YAxis
            tick={{ fill: "#64748B", dx: -6 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />

          <CartesianGrid stroke="#F1F5F9" vertical={false} />

          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563EB"
            strokeWidth={2}
            fill="url(#areaGradient)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueTrendChart;
