import React from 'react';

const RevenueChart = ({ data }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Revenue</h3>
      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden">
              <div
                className="bg-gradient-to-t from-green-600 to-green-400 transition-all duration-500 ease-out"
                style={{
                  height: `${(value / maxValue) * 200}px`,
                  minHeight: '4px'
                }}
              />
            </div>
            <span className="text-xs text-gray-600 mt-2">{months[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;