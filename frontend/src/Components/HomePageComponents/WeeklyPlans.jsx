import React from 'react';

const WeeklyPlans = ({ plans }) => {
  return (
    <div className="w-full p-6 bg-blue-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Weekly Plans</h2>
      <p className="mb-4 text-lg">
        "A goal without a plan is just a wish." Make sure you're on track this week with your plans!
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

export default WeeklyPlans;

