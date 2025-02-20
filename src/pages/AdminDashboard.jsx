import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getDashboardData } from "../api/analytics";
import { useNavigate } from "react-router-dom";
import Metrics from "../components/Metrics";
import TimeframeDropdown from "../components/Timeframe";
import Charts from "../components/Charts";
import Orders from "../components/Orders";
import Navbar from "../components/Navbar/Navbar";

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
};

const Dashboard = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [timeframe, setTimeframe] = useState("thisYear");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const handleUnauthorizedError = async () => {
      await logout();
      navigate("/login");
    };

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await getDashboardData(token, timeframe);
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        
        // Check if error is unauthorized (401)
        if (error.response?.status === 401 || 
            error.message?.toLowerCase().includes('unauthorized')) {
          await handleUnauthorizedError();
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token, timeframe, navigate, logout]);

  if (isLoading || !dashboardData) {
    return (
      <p className="text-gray-500 text-center py-6">Loading dashboard...</p>
    );
  }

  const today = new Date();

  const metricsData = [
    {
      title: "Total Revenue",
      value: `$${dashboardData.totalRevenue.totalRevenue.toLocaleString()}`,
      percentage: dashboardData.totalRevenue.percentageChange,
    },
    {
      title: "Orders",
      value: dashboardData.totalOrders.orderCount.toLocaleString(),
      percentage: dashboardData.totalOrders.percentageChange,
    },
    {
      title: "Customers",
      value: dashboardData.totalCustomers.uniqueCustomers.toLocaleString(),
      percentage: dashboardData.totalCustomers.percentageChange,
    },
  ];

  return (
    <div className="bg-[#F8FAFC]">
      <Navbar />
      <div className="flex align-items-center justify-start w-full">
        <div className="w-full max-w-[20%]">
          <div className="w-full max-w-[20%] min-h-[100vh] bg-white border-r border-gray-100 p-2.5 fixed">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-5 py-8 px-4">
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M8.24999 3.66669H4.58332C4.07706 3.66669 3.66666 4.07709 3.66666 4.58335V8.25002C3.66666 8.75628 4.07706 9.16669 4.58332 9.16669H8.24999C8.75625 9.16669 9.16666 8.75628 9.16666 8.25002V4.58335C9.16666 4.07709 8.75625 3.66669 8.24999 3.66669Z"
                      stroke="#64748B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.4167 3.66669H13.75C13.2437 3.66669 12.8333 4.07709 12.8333 4.58335V8.25002C12.8333 8.75628 13.2437 9.16669 13.75 9.16669H17.4167C17.9229 9.16669 18.3333 8.75628 18.3333 8.25002V4.58335C18.3333 4.07709 17.9229 3.66669 17.4167 3.66669Z"
                      stroke="#64748B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.24999 12.8334H4.58332C4.07706 12.8334 3.66666 13.2438 3.66666 13.75V17.4167C3.66666 17.9229 4.07706 18.3334 4.58332 18.3334H8.24999C8.75625 18.3334 9.16666 17.9229 9.16666 17.4167V13.75C9.16666 13.2438 8.75625 12.8334 8.24999 12.8334Z"
                      stroke="#64748B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.4167 12.8334H13.75C13.2437 12.8334 12.8333 13.2438 12.8333 13.75V17.4167C12.8333 17.9229 13.2437 18.3334 13.75 18.3334H17.4167C17.9229 18.3334 18.3333 17.9229 18.3333 17.4167V13.75C18.3333 13.2438 17.9229 12.8334 17.4167 12.8334Z"
                      stroke="#64748B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-[#64748B] text-[16px] font-medium">
                    Overview
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4167 4.41669H2.58333C1.57081 4.41669 0.75 5.2375 0.75 6.25002V14.5C0.75 15.5125 1.57081 16.3334 2.58333 16.3334H15.4167C16.4292 16.3334 17.25 15.5125 17.25 14.5V6.25002C17.25 5.2375 16.4292 4.41669 15.4167 4.41669Z"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.33334 4.41667V2.58333C5.33334 2.0971 5.5265 1.63079 5.87031 1.28697C6.21413 0.943154 6.68045 0.75 7.16668 0.75H10.8333C11.3196 0.75 11.7859 0.943154 12.1297 1.28697C12.4735 1.63079 12.6667 2.0971 12.6667 2.58333V4.41667"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9V9.00917"
                      stroke="#64748B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0.75 9.91669C3.30895 11.2061 6.13453 11.8778 9 11.8778C11.8655 11.8778 14.6911 11.2061 17.25 9.91669"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-[#64748B] text-[16px] font-medium">
                    Sales
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M14.5 2.58331H3.49999C2.48747 2.58331 1.66666 3.40412 1.66666 4.41665V15.4166C1.66666 16.4292 2.48747 17.25 3.49999 17.25H14.5C15.5125 17.25 16.3333 16.4292 16.3333 15.4166V4.41665C16.3333 3.40412 15.5125 2.58331 14.5 2.58331Z"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.6667 0.75V4.41667"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.33331 0.75V4.41667"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.66666 8.08334H16.3333"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.08331 11.75H8.99998"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11.75V14.5"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[#64748B] text-[16px] font-medium">
                    Customers
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                  >
                    <path
                      d="M9 6.33334V10L10.8333 11.8333"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0.795837 9.08333C1.00125 7.06672 1.94191 5.19631 3.43834 3.82897C4.93477 2.46163 6.88222 1.69306 8.90914 1.66991C10.9361 1.64676 12.9006 2.37064 14.4278 3.70345C15.9551 5.03626 16.9382 6.88469 17.1897 8.89609C17.4411 10.9075 16.9432 12.941 15.791 14.6088C14.6388 16.2765 12.9129 17.4617 10.9427 17.9382C8.97243 18.4147 6.89571 18.1491 5.10875 17.1922C3.32179 16.2353 0.795837 12.75 0.795837 12.75M0.795837 17.3333V12.75M0.795837 12.75H5.37917"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-[#64748B] text-[16px] font-medium">
                    Inventory
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M11 16.2708L5.34234 19.2454L6.42309 12.9452L1.83975 8.48376L8.16475 7.56709L10.9936 1.83517L13.8224 7.56709L20.1474 8.48376L15.5641 12.9452L16.6448 19.2454L11 16.2708Z"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-[#64748B] text-[16px] font-medium">
                    Profit/Loss
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 py-8 px-4">
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M7.46458 1.95725C7.85508 0.347583 10.1449 0.347583 10.5354 1.95725C10.594 2.19907 10.7089 2.42363 10.8707 2.61267C11.0324 2.8017 11.2366 2.94987 11.4664 3.0451C11.6963 3.14033 11.9454 3.17995 12.1935 3.16071C12.4415 3.14148 12.6816 3.06394 12.894 2.93442C14.3084 2.07275 15.9282 3.69158 15.0665 5.10692C14.9372 5.31927 14.8597 5.55914 14.8406 5.80704C14.8214 6.05494 14.8609 6.30387 14.9561 6.5336C15.0512 6.76332 15.1992 6.96736 15.388 7.12913C15.5768 7.2909 15.8012 7.40583 16.0428 7.46458C17.6524 7.85508 17.6524 10.1449 16.0428 10.5354C15.8009 10.594 15.5764 10.7089 15.3873 10.8707C15.1983 11.0324 15.0501 11.2366 14.9549 11.4664C14.8597 11.6963 14.8201 11.9454 14.8393 12.1935C14.8585 12.4415 14.9361 12.6816 15.0656 12.894C15.9273 14.3084 14.3084 15.9282 12.8931 15.0665C12.6807 14.9372 12.4409 14.8597 12.193 14.8406C11.9451 14.8214 11.6961 14.8609 11.4664 14.9561C11.2367 15.0512 11.0326 15.1992 10.8709 15.388C10.7091 15.5768 10.5942 15.8012 10.5354 16.0428C10.1449 17.6524 7.85508 17.6524 7.46458 16.0428C7.40599 15.8009 7.29113 15.5764 7.12935 15.3873C6.96757 15.1983 6.76344 15.0501 6.53357 14.9549C6.3037 14.8597 6.0546 14.8201 5.80653 14.8393C5.55846 14.8585 5.31844 14.9361 5.106 15.0656C3.69158 15.9273 2.07183 14.3084 2.9335 12.8931C3.06284 12.6807 3.14025 12.4409 3.15944 12.193C3.17863 11.9451 3.13906 11.6961 3.04393 11.4664C2.94881 11.2367 2.80082 11.0326 2.612 10.8709C2.42318 10.7091 2.19885 10.5942 1.95725 10.5354C0.347583 10.1449 0.347583 7.85508 1.95725 7.46458C2.19907 7.40599 2.42363 7.29113 2.61267 7.12935C2.8017 6.96757 2.94987 6.76344 3.0451 6.53357C3.14033 6.3037 3.17995 6.0546 3.16071 5.80653C3.14148 5.55846 3.06394 5.31844 2.93442 5.106C2.07275 3.69158 3.69158 2.07183 5.10692 2.9335C6.02358 3.49083 7.21158 2.99767 7.46458 1.95725Z"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11.75C10.5188 11.75 11.75 10.5188 11.75 9C11.75 7.48122 10.5188 6.25 9 6.25C7.48122 6.25 6.25 7.48122 6.25 9C6.25 10.5188 7.48122 11.75 9 11.75Z"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-[#64748B] text-[16px] font-medium">
                    Settings
                  </p>
                </div>
                <div className="flex gap-4 items-center cursor-pointer" onClick={logout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M10.8333 5.33333V3.5C10.8333 3.01377 10.6402 2.54745 10.2964 2.20363C9.95254 1.85982 9.48623 1.66666 9 1.66666H2.58333C2.0971 1.66666 1.63079 1.85982 1.28697 2.20363C0.943154 2.54745 0.75 3.01377 0.75 3.5V14.5C0.75 14.9862 0.943154 15.4525 1.28697 15.7964C1.63079 16.1402 2.0971 16.3333 2.58333 16.3333H9C9.48623 16.3333 9.95254 16.1402 10.2964 15.7964C10.6402 15.4525 10.8333 14.9862 10.8333 14.5V12.6667"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.41666 9H17.25M17.25 9L14.5 6.25M17.25 9L14.5 11.75"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-[#64748B] text-[16px] font-medium">
                    Log Out
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mx-auto w-full max-w-[75%]">
          <div className="flex justify-between items-center w-full">
            <div className="space-y-2.5">
              <h1 className="inter text-3xl font-bold">Welcome Admin</h1>
              <p className="text-gray-600">{formatDate(today)}</p>
            </div>
            <TimeframeDropdown
              timeframe={timeframe}
              setTimeframe={setTimeframe}
            />
          </div>

          <div className="mt-6">
            <Metrics metrics={metricsData} />
          </div>

          <Charts
            revenueTrend={dashboardData.revenueTrend}
            ordersByCategory={dashboardData.ordersByCategory}
            totalOrders={dashboardData.totalOrders.orderCount.toLocaleString()}
          />

          <Orders
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            setTotalPages={setTotalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
