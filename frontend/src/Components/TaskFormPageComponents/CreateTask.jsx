import React, { useState } from 'react';

const CreateTask = ({ planId, onAddTask, onClose }) => {
  const [tasks, setTasks] = useState([{ taskName: '', taskType: '' }]);
  const [error, setError] = useState(null);

  const handleTaskChange = (index, e) => {
    const newTasks = [...tasks];
    newTasks[index][e.target.name] = e.target.value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { taskName: '', taskType: '' }]);
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const taskData = tasks.map(task => ({ ...task, planId }));
      onAddTask(taskData);
    } catch (error) {
      setError('Failed to add tasks. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Tasks to Plan</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {tasks.map((task, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2 flex justify-between items-center">
              <label className="block text-gray-700 mb-1">Task Name</label>
              <button
                type="button"
                onClick={() => handleRemoveTask(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
            <input
              type="text"
              name="taskName"
              value={task.taskName}
              onChange={(e) => handleTaskChange(index, e)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-2"
              required
            />
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Task Type</label>
              <select
                name="taskType"
                value={task.taskType}
                onChange={(e) => handleTaskChange(index, e)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                required
              >
                <option value="" disabled>Select task type</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddTask}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
          >
            Add Another Task
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Done
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;







