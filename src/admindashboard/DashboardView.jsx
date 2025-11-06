// import React, { useEffect, useState } from "react";
// import {
//   Users,
//   Package,
//   ShoppingCart,
//   DollarSign,
//   Clock,
//   Star,
//   MessageSquare,
// } from "lucide-react";
// import StatsCard from "./StatsCard";
// import RevenueChart from "./RevenueChart";
// import TopProducts from "./TopProducts";

// const DashboardView = () => {
//   const [productCount, setProductCount] = useState(0);
//   const [userCount, setUserCount] = useState(0);
//   const [pendingMessages, setPendingMessages] = useState(0);
//   const [monthlyRevenue, setMonthlyRevenue] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);

//   useEffect(() => {
//     fetchTotalProducts();
//     fetchTotalUsers();
//     fetchPendingMessages();
//     fetchTopProducts(); // 🔁 fetch real top products

//     // Mock revenue for chart
//     setMonthlyRevenue([
//       { month: "Jan", revenue: 12000 },
//       { month: "Feb", revenue: 15000 },
//       { month: "Mar", revenue: 17000 },
//       { month: "Apr", revenue: 14000 },
//       { month: "May", revenue: 20000 },
//       { month: "Jun", revenue: 22000 },
//     ]);
//   }, []);

//   const fetchTopProducts = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/products");
//       const data = await res.json();

//       // Optionally sort by sales or revenue descending
//       const sorted = data
//         .filter((p) => p.sales || p.revenue)
//         .sort((a, b) => (b.sales || 0) - (a.sales || 0))
//         .slice(0, 5); // top 5

//       setTopProducts(sorted);
//     } catch (err) {
//       console.error("❌ Failed to fetch top products:", err);
//     }
//   };

//   const fetchTotalProducts = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/products");
//       const data = await res.json();
//       setProductCount(data.length);
//     } catch (err) {
//       console.error("❌ Failed to fetch products:", err);
//     }
//   };

//   const fetchTotalUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/users");
//       const data = await res.json();
//       setUserCount(data.length);
//     } catch (err) {
//       console.error("❌ Failed to fetch users:", err);
//     }
//   };

//   const fetchPendingMessages = async () => {
//     try {
//       const res = await fetch(
//         "http://localhost:5000/api/contact-messages?status=pending"
//       );
//       const data = await res.json();
//       setPendingMessages(data.length);
//     } catch (err) {
//       console.error("❌ Failed to fetch pending messages:", err);
//     }
//   };

//   const stats = {
//     totalOrders: 124,
//     totalRevenue: 89000,
//     pendingOrders: 8,
//     pendingReviews: 5,
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
//         <p className="text-gray-600">
//           Welcome to your pickle business dashboard
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatsCard
//           title="Total Users"
//           value={userCount}
//           icon={Users}
//           color="blue"
//           trend={{ positive: true, value: "+12%" }}
//         />
//         <StatsCard
//           title="Total Products"
//           value={productCount}
//           icon={Package}
//           color="green"
//           trend={{ positive: true, value: "+5%" }}
//         />
//         <StatsCard
//           title="Total Orders"
//           value={stats.totalOrders}
//           icon={ShoppingCart}
//           color="orange"
//           trend={{ positive: true, value: "+18%" }}
//         />
//         <StatsCard
//           title="Total Revenue"
//           value={`₹${stats.totalRevenue.toLocaleString()}`}
//           icon={DollarSign}
//           color="purple"
//           trend={{ positive: true, value: "+22%" }}
//         />
//       </div>

//       {/* Pending Items */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatsCard
//           title="Pending Orders"
//           value={stats.pendingOrders}
//           icon={Clock}
//           color="red"
//         />
//         <StatsCard
//           title="Pending Reviews"
//           value={stats.pendingReviews}
//           icon={Star}
//           color="orange"
//         />
//         <StatsCard
//           title="Pending Messages"
//           value={pendingMessages}
//           icon={MessageSquare}
//           color="blue"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <RevenueChart data={monthlyRevenue} />
//         <TopProducts products={topProducts} />
//       </div>
//     </div>
//   );
// };

// export default DashboardView;
import React from 'react'

const DashboardView = () => {
  return (
    <div>
      
    </div>
  )
}

export default DashboardView

