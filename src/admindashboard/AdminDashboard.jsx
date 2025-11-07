import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardView from "./DashboardView";
import ProductsView from "./ProductsView";
import OrdersView from "./OrdersView";
import UsersView from "./UsersView";
import ReviewsView from "./ReviewsView";
import MessagesView from "./MessagesView";
import CategoryManage from "./CategoryManage";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ isAdmin, setIsAdmin }) => {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/");
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "products":
        return <ProductsView />;
      case "orders":
        return <OrdersView />;
      case "users":
        return <UsersView />;
      case "reviews":
        return <ReviewsView />;
      case "messages":
        return <MessagesView />;
      case "categories": // ⬅ add this
        return <CategoryManage />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header
          toggleSidebar={toggleSidebar}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">{renderActiveView()}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
