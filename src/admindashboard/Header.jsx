import React from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from '../../hooks/useAuth';

const Header = ({ toggleSidebar, isAdmin, setIsAdmin }) => {
  //   const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your pickle business</p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          {/* <button className="relative p-2 hover:bg-gray-100 rounded-md transition">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              3
            </span>
          </button> */}

          {/* Profile */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                {/* <p className="text-sm font-medium text-gray-900">{user?.name}</p> */}
                {/* <p className="text-xs text-gray-500">{user?.email}</p> */}
              </div>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                {/* <p className="text-sm font-medium text-gray-800">{user?.name}</p> */}
                {/* <p className="text-xs text-gray-500">{user?.email}</p> */}
              </div>
              <button
                onClick={() => navigate("/")}
                className="w-full text-left px-4 py-2 flex items-center text-sm text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
