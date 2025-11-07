// import React, { useState } from 'react';
// import { Search, Filter, Mail, Clock, CheckCircle, MessageSquare } from 'lucide-react';
// import { mockContactMessages } from '../../data/mockData';
// import MessageDetails from './MessageDetails';

// const MessagesView = () => {
//   const [messages, setMessages] = useState(mockContactMessages);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [selectedMessage, setSelectedMessage] = useState(null);

//   const statusOptions = ['All', 'pending', 'responded', 'resolved'];

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'pending': return <Clock className="w-4 h-4" />;
//       case 'responded': return <MessageSquare className="w-4 h-4" />;
//       case 'resolved': return <CheckCircle className="w-4 h-4" />;
//       default: return <Mail className="w-4 h-4" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'responded': return 'bg-blue-100 text-blue-800';
//       case 'resolved': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const filteredMessages = messages.filter(message => {
//     const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          message.message.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = !statusFilter || statusFilter === 'All' || message.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const handleStatusUpdate = (messageId, newStatus, response = null) => {
//     setMessages(messages.map(message => 
//       message.id === messageId 
//         ? { 
//             ...message, 
//             status: newStatus,
//             ...(response && { response, respondedAt: new Date().toISOString() })
//           }
//         : message
//     ));
//   };

//   if (selectedMessage) {
//     return (
//       <MessageDetails
//         message={selectedMessage}
//         onBack={() => setSelectedMessage(null)}
//         onStatusUpdate={handleStatusUpdate}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
//         <p className="text-gray-600">Manage customer inquiries and support requests</p>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search messages..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Filter className="w-5 h-5 text-gray-400" />
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             >
//               {statusOptions.map(status => (
//                 <option key={status} value={status === 'All' ? '' : status}>
//                   Status: {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Messages List */}
//       <div className="space-y-4">
//         {filteredMessages.map(message => (
//           <div 
//             key={message.id} 
//             className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
//             onClick={() => setSelectedMessage(message)}
//           >
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <div className="flex items-center space-x-4 mb-3">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <span className="text-green-600 font-semibold">
//                       {message.name.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900">{message.name}</p>
//                     <p className="text-sm text-gray-600">{message.email}</p>
//                     {message.phone && (
//                       <p className="text-sm text-gray-600">{message.phone}</p>
//                     )}
//                   </div>
//                   <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
//                     {getStatusIcon(message.status)}
//                     <span className="capitalize">{message.status}</span>
//                   </span>
//                 </div>

//                 <h3 className="font-medium text-gray-900 mb-2">{message.subject}</h3>
//                 <p className="text-gray-700 mb-3 line-clamp-2">{message.message}</p>

//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <span>{new Date(message.createdAt).toLocaleDateString()}</span>
//                   {message.respondedAt && (
//                     <span>Responded: {new Date(message.respondedAt).toLocaleDateString()}</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredMessages.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No messages found matching your criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessagesView;



import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import MessageDetails from './MessageDetails';
import { useLocation } from 'react-router-dom';

const MessagesView = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const openId = query.get('open');

  const statusOptions = ['All', 'pending', 'responded', 'resolved'];


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const openMessageId = params.get('open');
    if (openMessageId) {
      const found = messages.find((m) => m.id === openMessageId);
      if (found) {
        setSelectedMessage(found);
      }
    }
  }, [location.search, messages]);
  // 🟢 Fetch messages from backend on load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/contact-messages');
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'responded': return <MessageSquare className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 🟢 Filter messages based on search and status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || statusFilter === 'All' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 🟢 Update status and response via API
  const handleStatusUpdate = async (messageId, newStatus, response = null) => {
    try {
      const res = await fetch(`/api/contact-messages/${messageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          response: response || '',
        }),
      });

      if (res.ok) {
        // Update local state after successful API update
        const updated = messages.map(msg =>
          msg.message_id === messageId
            ? {
              ...msg,
              status: newStatus,
              response: response || msg.response,
              respondedAt: response ? new Date().toISOString() : msg.respondedAt,
            }
            : msg
        );
        setMessages(updated);
      } else {
        console.error('Failed to update status');
      }
    } catch (err) {
      console.error('API error:', err);
    }
  };

  if (selectedMessage) {
    return (
      <MessageDetails
        message={selectedMessage}
        onBack={() => setSelectedMessage(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Manage customer inquiries and support requests</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
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

      {/* Message List */}
      {loading ? (
        <p className="text-gray-500 text-center py-12">Loading messages...</p>
      ) : filteredMessages.length > 0 ? (
        <div className="space-y-4">
          {filteredMessages.map(message => (
            <div
              key={message.message_id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">
                        {message.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-600">{message.email}</p>
                      {message.phone && (
                        <p className="text-sm text-gray-600">{message.phone}</p>
                      )}
                    </div>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {getStatusIcon(message.status)}
                      <span className="capitalize">{message.status}</span>
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{message.subject}</h3>
                  <p className="text-gray-700 mb-3 line-clamp-2">{message.message}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(message.created_at).toLocaleDateString()}</span>
                    {message.responded_at && (
                      <span>Responded: {new Date(message.responded_at).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No messages found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MessagesView;
