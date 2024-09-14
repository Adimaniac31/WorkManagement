import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTodaysTask, fetchTodaysTasks } from '../../features/taskSlice'; // Assuming you have this action

const TodaysTasks = ({ tasks = [], status, error }) => {
  const dispatch = useDispatch();

  // Function to handle checkbox toggle
  const handleCheckboxChange = (taskId, completionStatus) => {
    console.log(taskId, completionStatus);
    // Dispatch the updateTask action with updated completion status
    dispatch(updateTodaysTask({ 
      userId: localStorage.getItem('userId'),
      taskId,
      completionStatus: !completionStatus, 
    }));
    dispatch(fetchTodaysTasks({ userId }));
  };

  if (status === 'loading') {
    return <p>Loading today's tasks...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.length > 0 ? tasks.map((task) => {
        if (!task) {
          return <li key={Math.random()} className="p-2 bg-gray-100 rounded shadow-md">Invalid task</li>;
        }

        const isCompleted = task.completionStatus === 1;

        return (
          <li key={task.id} className="p-2 bg-gray-100 rounded shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {/* Checkbox for completion status */}
                <input 
                  type="checkbox" 
                  checked={isCompleted}
                  onChange={() => handleCheckboxChange(task.id, task.completionStatus)}
                  className="mr-2"
                />
                <span>{task.taskName}</span>
              </div>
              <span 
                className={`ml-4 px-2 py-1 text-xs font-semibold rounded ${
                  isCompleted 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {isCompleted ? 'Completed' : 'Incomplete'}
              </span>
            </div>
          </li>
        );
      }) : (
        <p>No tasks for today.</p>
      )}
    </ul>
  );
};

export default TodaysTasks;




