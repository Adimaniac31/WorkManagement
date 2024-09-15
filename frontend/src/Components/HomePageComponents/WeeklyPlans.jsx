import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, fetchWeeklyTasks } from '../../features/taskSlice';

const WeeklyPlans = ({ plans }) => {
  const dispatch = useDispatch();

  const handleUpdatePlan = async (planId, completionStatus) => {
    await dispatch(updateTask({
      userId: localStorage.getItem('userId'),
      taskId: planId,
      completionStatus: !completionStatus, // Toggle the completion status
      taskType: "week" // Specify that this is a weekly plan
    }));
    dispatch(fetchWeeklyTasks({ userId: localStorage.getItem('userId') }));
  };

  return (
    <div className="w-full p-6 bg-blue-50 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Weekly Plans</h2>
      <p className="mb-4 text-base md:text-lg text-gray-700">
        "A goal without a plan is just a wish." Make sure you're on track this week with your plans!
      </p>
      {plans.length > 0 ? (
        <ul className="list-none space-y-4">
          {plans.map((plan) => (
            <li key={plan.id} className="flex flex-wrap justify-between items-center p-4 bg-white rounded shadow">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={plan.completionStatus}
                  onChange={() => handleUpdatePlan(plan.id, plan.completionStatus)}
                  className="mr-3 h-5 w-5"
                />
                <span className="text-lg">{plan.taskName}</span>
              </div>
              <span 
                className={`ml-4 px-2 py-1 mt-2 md:mt-0 text-xs font-semibold rounded ${
                  plan.completionStatus 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {plan.completionStatus ? 'Completed' : 'Incomplete'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg">No weekly plans. Start planning to make the most of your time!</p>
      )}
    </div>
  );
};

export default WeeklyPlans;
