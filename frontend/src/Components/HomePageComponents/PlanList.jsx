import React from 'react';

const PlanList = ({ plans }) => {
  return (
    <div className="w-full p-6 bg-green-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Your Plans</h2>
      <p className="mb-4 text-lg">
        "Planning is bringing the future into the present." Review your plans to make each day count!
      </p>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id} className="mb-3 text-lg">
            {plan.planName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanList;

