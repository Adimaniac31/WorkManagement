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
        setError(null);
      })
      .catch((err) => {
        setError(err.error);
      });
  };

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-[#F9F4E0] mb-4">Task List</h2>
      {error && (
        <div className="text-[#DC2626] mb-4 p-2 border border-[#DC2626] rounded-lg bg-[#F9F4E0]">
          {error}
        </div>
      )}
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center p-4 bg-white border border-[#F4A300] rounded-lg shadow-md">
            <div className='gap-4'>
              <h3 className="text-lg text-textPrimary font-serif font-semibold gap-2">{task.taskName}</h3>
              <p className="text-sm text-black font-semibold">{task.taskType} - {task.completionStatus ? '✔️' : '❌'}</p>
            </div>
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-[#DC2626] text-white px-3 py-2 rounded-lg hover:bg-[#B91C1C] transition-colors duration-200"
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





