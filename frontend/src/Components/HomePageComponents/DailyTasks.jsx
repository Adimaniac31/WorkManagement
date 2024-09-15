import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, fetchDailyTasks, fetchTodaysTasks } from '../../features/taskSlice';

const DailyTasks = ({ tasks }) => {
  const dispatch = useDispatch();

  const handleUpdateTask = async (taskId, completionStatus) => {
    await dispatch(updateTask({
      userId: localStorage.getItem('userId'),
      taskId,
      completionStatus: !completionStatus, // Toggle the completion status
      taskType: "daily"
    }));
    
    await dispatch(fetchDailyTasks({ userId: localStorage.getItem('userId') }));
    await dispatch(fetchTodaysTasks({ userId: localStorage.getItem('userId') }));
  };

  return (
    <div className="w-full p-6 bg-yellow-50 rounded-lg shadow-lg md:w-4/5 max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Daily Tasks</h2>
      <p className="mb-4 text-base md:text-lg">
        "The secret of your future is hidden in your daily routine." Complete your tasks today for a productive tomorrow!
      </p>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="flex flex-wrap justify-between items-center mb-4 p-4 bg-white rounded shadow">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completionStatus}
                onChange={() => handleUpdateTask(task.id, task.completionStatus)}
                className="mr-3 h-5 w-5"
              />
              <span className="text-lg">{task.taskName}</span>
            </div>
            <span 
              className={`ml-4 px-2 py-1 mt-2 md:mt-0 text-xs font-semibold rounded ${
                task.completionStatus 
                  ? 'bg-green-200 text-green-800' 
                  : 'bg-red-200 text-red-800'
              }`}
            >
              {task.completionStatus ? 'Completed' : 'Incomplete'}
            </span>
          </div>
        ))
      ) : (
        <p className="text-lg">No daily tasks. Add a task to get started!</p>
      )}
    </div>
  );
};

export default DailyTasks;
