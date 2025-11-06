import React from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  MessageSquare,
  Menu,
  X,
  Folder,
} from "lucide-react";

const Sidebar = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "users", label: "Users", icon: Users },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "categories", label: "Categories", icon: Folder },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-green-600 to-green-700 text-white shadow-lg 
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Mrs. Priya</h1>
              <p className="text-sm text-white/80">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsOpen(false);
                }}
                className={`
                  flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-white text-green-700 shadow-md"
                      : "hover:bg-white/10 text-white/80 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-green-700" : "text-white/70"
                  }  `}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
