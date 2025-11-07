// import React, { useState } from 'react';
// import { ArrowLeft, User, Mail, Phone, MessageSquare, Clock, CheckCircle } from 'lucide-react';

// const MessageDetails = ({ message, onBack, onStatusUpdate }) => {
//   const [response, setResponse] = useState(message.response || '');
//   const [responseMode, setResponseMode] = useState(false);

//   const handleSendResponse = () => {
//     if (response.trim()) {
//       onStatusUpdate(message.id, 'responded', response);
//       setResponseMode(false);
//     }
//   };

//   const handleMarkResolved = () => {
//     onStatusUpdate(message.id, 'resolved');
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'pending': return <Clock className="w-5 h-5" />;
//       case 'responded': return <MessageSquare className="w-5 h-5" />;
//       case 'resolved': return <CheckCircle className="w-5 h-5" />;
//       default: return <Mail className="w-5 h-5" />;
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

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={onBack}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5 text-gray-600" />
//         </button>
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Message Details</h1>
//           <p className="text-gray-600">From: {message.name}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Message Content */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Original Message */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-900">Original Message</h2>
//               <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(message.status)}`}>
//                 {getStatusIcon(message.status)}
//                 <span className="capitalize">{message.status}</span>
//               </span>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-2">{message.subject}</h3>
//                 <p className="text-gray-700 leading-relaxed">{message.message}</p>
//               </div>
              
//               <div className="pt-4 border-t border-gray-200 text-sm text-gray-500">
//                 <p>Received: {new Date(message.createdAt).toLocaleString()}</p>
//               </div>
//             </div>
//           </div>

//           {/* Response Section */}
//           {message.response && !responseMode && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Response</h2>
//               <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
//                 <p className="text-gray-700">{message.response}</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Sent: {new Date(message.respondedAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Response Form */}
//           {responseMode && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Response</h2>
//               <div className="space-y-4">
//                 <textarea
//                   value={response}
//                   onChange={(e) => setResponse(e.target.value)}
//                   placeholder="Type your response here..."
//                   rows={6}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
//                 />
//                 <div className="flex space-x-3">
//                   <button
//                     onClick={handleSendResponse}
//                     disabled={!response.trim()}
//                     className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
//                   >
//                     Send Response
//                   </button>
//                   <button
//                     onClick={() => setResponseMode(false)}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Contact Information */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <User className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <p className="font-medium text-gray-900">{message.name}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Mail className="w-5 h-5 text-gray-400" />
//                 <div>
//                   <p className="text-gray-700">{message.email}</p>
//                 </div>
//               </div>
//               {message.phone && (
//                 <div className="flex items-center space-x-3">
//                   <Phone className="w-5 h-5 text-gray-400" />
//                   <div>
//                     <p className="text-gray-700">{message.phone}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
//             <div className="space-y-3">
//               {message.status === 'pending' && (
//                 <button
//                   onClick={() => setResponseMode(true)}
//                   className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//                 >
//                   <MessageSquare className="w-4 h-4" />
//                   <span>Respond</span>
//                 </button>
//               )}
              
//               {message.status === 'responded' && (
//                 <button
//                   onClick={handleMarkResolved}
//                   className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
//                 >
//                   <CheckCircle className="w-4 h-4" />
//                   <span>Mark Resolved</span>
//                 </button>
//               )}
              
//               {message.status !== 'pending' && (
//                 <button
//                   onClick={() => setResponseMode(true)}
//                   className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <MessageSquare className="w-4 h-4" />
//                   <span>Add Follow-up</span>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageDetails;


import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const MessageDetails = ({ message, onBack, onStatusUpdate }) => {
  const [response, setResponse] = useState(message.response || '');
  const [responseMode, setResponseMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendResponse = async () => {
    if (!response.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/contact-messages/${message.message_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'responded',
          response: response,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        onStatusUpdate(message.message_id, 'responded', response);
        setResponseMode(false);
      } else {
        console.error("Failed to send response");
      }
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkResolved = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contact-messages/${message.message_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved', response: message.response || '' }),
      });

      if (res.ok) {
        const updated = await res.json();
        onStatusUpdate(message.message_id, 'resolved');
      } else {
        console.error("Failed to mark as resolved");
      }
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'responded': return <MessageSquare className="w-5 h-5" />;
      case 'resolved': return <CheckCircle className="w-5 h-5" />;
      default: return <Mail className="w-5 h-5" />;
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

  return (
    <div className="space-y-6">
      {/* ...HEADER and MESSAGE content remain the same... */}

      {/* RESPONSE FORM */}
      {responseMode && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Response</h2>
          <div className="space-y-4">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response here..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSendResponse}
                disabled={!response.trim() || loading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
              >
                {loading ? "Sending..." : "Send Response"}
              </button>
              <button
                onClick={() => setResponseMode(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
        <div className="space-y-3">
          {message.status === 'pending' && (
            <button
              onClick={() => setResponseMode(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Respond</span>
            </button>
          )}

          {message.status === 'responded' && (
            <button
              onClick={handleMarkResolved}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{loading ? "Updating..." : "Mark Resolved"}</span>
            </button>
          )}

          {message.status !== 'pending' && (
            <button
              onClick={() => setResponseMode(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Add Follow-up</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageDetails;
