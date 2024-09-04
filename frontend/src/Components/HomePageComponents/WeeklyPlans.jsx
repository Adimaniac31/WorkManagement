import React from 'react';

const WeeklyPlans = ({ plans }) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Weekly Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id} className="mb-2">
            {plan.planName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyPlans;
