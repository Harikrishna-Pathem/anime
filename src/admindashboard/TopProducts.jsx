import React from 'react';

const TopProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
        <p className="text-sm text-gray-500">No top products available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-medium text-gray-900">{product.name || 'Unnamed Product'}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                ₹{Number(product.revenue || 0).toLocaleString()}
              </p>

              <p className="text-xs text-gray-600">{product.sales || 0} sales</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
