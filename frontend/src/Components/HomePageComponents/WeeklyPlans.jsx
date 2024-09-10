import React from 'react';

const WeeklyPlans = ({ plans }) => {
  return (
    <div className="w-full p-6 bg-blue-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Weekly Plans</h2>
      <p className="mb-4 text-base md:text-lg text-gray-700">
        "A goal without a plan is just a wish." Make sure you're on track this week with your plans!
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
        <p className="text-base md:text-lg text-gray-700">No plans available for this week. Start planning to make the most of your time!</p>
      )}
    </div>
  );
};

export default WeeklyPlans;