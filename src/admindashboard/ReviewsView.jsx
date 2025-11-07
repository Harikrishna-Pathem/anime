import React, { useState } from 'react';
import { Search, Filter, Star, Check, X, Eye } from 'lucide-react';
import { mockReviews } from './data/mockData';

const ReviewsView = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const statusOptions = ['All', 'approved', 'pending'];
  const ratingOptions = ['All', '5', '4', '3', '2', '1'];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === 'All' || 
                         (statusFilter === 'approved' && review.isApproved) ||
                         (statusFilter === 'pending' && !review.isApproved);
    const matchesRating = !ratingFilter || ratingFilter === 'All' || 
                         review.rating.toString() === ratingFilter;
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleApproveReview = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, isApproved: true } : review
    ));
  };

  const handleRejectReview = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, isApproved: false } : review
    ));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-600">Moderate customer reviews and feedback</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
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
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {ratingOptions.map(rating => (
                <option key={rating} value={rating === 'All' ? '' : rating}>
                  {rating === 'All' ? 'All Ratings' : `${rating} Stars`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(review => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{review.userName}</p>
                      <p className="text-sm text-gray-600">{review.productName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    review.isApproved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{review.comment}</p>
                
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {!review.isApproved && (
                  <button
                    onClick={() => handleApproveReview(review.id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                )}
                <button
                  onClick={() => handleRejectReview(review.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No reviews found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsView;