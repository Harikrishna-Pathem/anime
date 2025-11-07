import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  UserCheck,
  UserX,
  Mail,
  Phone
} from 'lucide-react';

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const roleOptions = ['All', 'admin', 'customer'];
  const statusOptions = ['All', 'active', 'inactive'];

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => {
        const mappedUsers = data.map(user => ({
          id: user.user_id,
          name: user.user_name,
          email: user.user_email,
          phone: user.user_phone1,
          address:
            user.address?.line1 ||
            user.address?.city ||
            user.address?.state ||
            "—",
          role: "customer",      // Hardcoded; replace with actual role if available
          isActive: true,        // Hardcoded; update if you add status field in DB
          totalOrders: 0,        // Placeholder; you can fetch actual orders later
          totalSpent: 0,         // Placeholder
          createdAt: user.created_at,
          lastLogin: null        // Optional if you store it
        }));
        setUsers(mappedUsers);
      })
      .catch(err => {
        console.error("❌ Failed to fetch users:", err);
      });
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      !roleFilter || roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus =
      !statusFilter || statusFilter === 'All' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600">Manage user accounts and view activity</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {roleOptions.map(role => (
                  <option key={role} value={role === 'All' ? '' : role}>
                    Role: {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status} value={status === 'All' ? '' : status}>
                  Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                    }`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleToggleUserStatus(user.id)}
                className={`p-2 rounded-lg transition-colors ${user.isActive
                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
              >
                {user.isActive ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.address && (
                <div>
                  <p className="font-medium text-gray-700">Address:</p>
                  <p className="text-xs">{user.address}</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Total Orders</p>
                  <p className="font-medium text-gray-900">{user.totalOrders}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Spent</p>
                  <p className="font-medium text-gray-900">₹{user.totalSpent.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                {user.lastLogin && <p>Last login: {new Date(user.lastLogin).toLocaleDateString()}</p>}
              </div>
            </div>

            <div className="mt-4">
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${user.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
                }`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default UsersView;
