import React from 'react';

const Plan = ({ plan }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{plan.planName}</h3>
      <p className="text-gray-700 mb-2">{plan.planType}</p>
    </div>
  );
};

export default Plan;



