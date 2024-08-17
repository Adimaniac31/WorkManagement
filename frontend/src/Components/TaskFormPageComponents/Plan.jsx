import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../features/taskSlice';
import { deletePlan } from '../../features/planSlice';
import TaskList from './TaskList';

const Plan = ({ id, plan, userId }) => {
  const dispatch = useDispatch();
  const [taskDisplaying, setTaskDisplaying] = useState(null);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleFetchTasks = () => {
    dispatch(fetchTasks({ userId, planId: id }))
      .unwrap()
      .then(response => {
        setTaskDisplaying(response.tasks);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const handleCloseTasks = () => {
    setTaskDisplaying(null);
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
        setError(null);
      })
      .catch(err => {
        setDeleting(false);
        setError(err.message);
      });
  };

  return (
    <div className="bg-backgroundBtn shadow-lg rounded-lg p-6 mb-6 w-full">
      <h3 className="text-2xl font-bold text-white mb-2 font-serif">Plan name : {plan.planName}</h3>
      <h3 className="text-xl text-white mb-4 font-serif">Plan Type: {plan.planType}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleFetchTasks}
          className="bg-backgroundBtnCorrect text-white px-4 py-2 rounded-lg hover:bg-[#d34949fc]"
        >
          Fetch Tasks
        </button>
        <button
          onClick={handleCloseTasks}
          className="bg-backgroundBtnIncorrect text-white px-4 py-2 rounded-lg hover:bg-slate-700"
        >
          Close
        </button>
        <button
          onClick={handleDeletePlan}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 mt-2"
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : 'Delete Plan'}
        </button>
      </div>
      {error && <div className="text-black font-semibold mb-4">{error}</div>}
      {taskDisplaying && <TaskList tasks={taskDisplaying} userId={userId} onTaskDelete={handleTaskDelete} />}
    </div>
  );
};

export default Plan;















