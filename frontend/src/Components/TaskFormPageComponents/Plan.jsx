import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../features/taskSlice';
import { deletePlan } from '../../features/planSlice';
import TaskList from './TaskList';

const Plan = ({ id, plan, userId }) => {
  const dispatch = useDispatch();
  const [taskDisplaying, setTaskDisplaying] = useState(null); // Stores tasks for the current plan
  const [error, setError] = useState(null); // Tracks fetch errors
  const [deleting, setDeleting] = useState(false); // Track if deletion is in progress

  const handleFetchTasks = () => {
    dispatch(fetchTasks({ userId, planId: id }))
      .unwrap() // Use unwrap() to handle promises directly
      .then(response => {
        setTaskDisplaying(response.tasks); // Set tasks for this plan
        setError(null); // Clear any previous errors
      })
      .catch(err => {
        setError(err.message);
        // console.error('Failed to fetch tasks:', err);
      });
  };

  const handleCloseTasks = () => {
    setTaskDisplaying(null); // Clear tasks when closing
  };

  const handleTaskDelete = (taskId) => {
    setTaskDisplaying(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleDeletePlan = () => {
    setDeleting(true);
    dispatch(deletePlan({ userId, planId: id }))
      .unwrap()
      .then(() => {
        setDeleting(false);
        setError(null); // Clear any previous errors
      })
      .catch(err => {
        setDeleting(false);
        setError(err.message);
        // console.error('Failed to delete plan:', err);
      });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{plan.planName}</h3>
      <button
        onClick={handleFetchTasks}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
      >
        Fetch Tasks
      </button>
      <button
        onClick={handleCloseTasks}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Close
      </button>
      <button
        onClick={handleDeletePlan}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 mt-2"
        disabled={deleting} // Disable button during deletion
      >
        {deleting ? 'Deleting...' : 'Delete Plan'}
      </button>
      {error && <div className="text-red-600 mb-2">{error}</div>} {/* Display error message */}
      {taskDisplaying && <TaskList tasks={taskDisplaying} userId={userId} onTaskDelete={handleTaskDelete} />}
    </div>
  );
};

export default Plan;












