import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../features/taskSlice';

const TaskList = ({ tasks, userId, onTaskDelete }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleDelete = (taskId) => {
    dispatch(deleteTask({ userId, taskId }))
      .unwrap()
      .then(() => {
        onTaskDelete(taskId);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        setError(err.error);
      });
  };

  return (
    <div className="mt-4">
      {error && (
        <div className="text-red-600 mb-2">
          {error}
        </div>
      )}
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border-b py-2 flex justify-between items-center">
            <span>{task.taskName} - {task.completionStatus} - {task.taskType}</span>
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;


