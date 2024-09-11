import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../features/taskSlice';

const DailyTasks = ({ tasks }) => {
  const dispatch = useDispatch();

  const handleUpdateTask = (taskId, completionStatus) => {
    dispatch(updateTask({
      userId: localStorage.getItem('userId'),
      taskId,
      completionStatus: !completionStatus, // Toggle the completion status
      taskType: "daily"
    }));
  };

  return (
    <div className="w-full p-6 bg-yellow-50 rounded-lg shadow-lg md:w-4/5 max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Daily Tasks</h2>
      <p className="mb-4 text-base md:text-lg">
        "The secret of your future is hidden in your daily routine." Complete your tasks today for a productive tomorrow!
      </p>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={task.completionStatus} // Ensure it's based on the actual completion status
              onChange={() => handleUpdateTask(task.id, task.completionStatus)}
              className="mr-3 h-5 w-5"
            />
            <span className={`text-lg ${task.completionStatus ? 'line-through text-gray-500' : ''}`}>
              {task.taskName}
            </span>
          </div>
        ))
      ) : (
        <p className="text-lg">No tasks for today. Add a task to get started!</p>
      )}
    </div>
  );
};

export default DailyTasks;
