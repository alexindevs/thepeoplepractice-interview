import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const Metrics = ({ metrics }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between bg-white shadow-sm rounded-lg p-6">
      {metrics.map(({ title, value, percentage }, index) => {
        const isPositive = percentage >= 0;
        return (
          <div key={title} className={`flex flex-col gap-4 w-1/3 ${index !== metrics.length - 1 ? "md:border-r md:border-r-[#E2E8F0]" : ""} px-4`}>
            <p className="text-[#64748B] font-[600] text-sm">{title}</p>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">{value.toLocaleString()}</h2>
              <span
                className={`flex items-center text-sm px-2 py-1 rounded-full ${
                  isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}
              >
                {isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {Math.round(Math.abs(percentage))}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Metrics;
