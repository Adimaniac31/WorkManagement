import React from 'react';

const PlanList = ({ plans }) => {
  return (
    <div className="w-full p-6 bg-green-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Your Plans</h2>
      <p className="mb-4 text-base md:text-lg text-gray-700">
        "Planning is bringing the future into the present." Review your plans to make each day count!
      </p>
      {plans.length > 0 ? (
        <ul className="list-disc list-inside pl-5">
          {plans.map((plan) => (
            <li key={plan.id} className="mb-3 text-base md:text-lg text-gray-800">
              {plan.planName}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-base md:text-lg text-gray-700">No plans available. Start creating your plans today!</p>
      )}
    </div>
  );
};

export default PlanList;