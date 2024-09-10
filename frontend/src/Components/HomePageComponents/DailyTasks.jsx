import React from 'react';

const DailyTasks = ({ tasks, onUpdateTask }) => {
  return (
    <div className="w-full p-6 bg-yellow-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Daily Tasks</h2>
      <p className="mb-4 text-lg">
        "The secret of your future is hidden in your daily routine." Complete your tasks today for a productive tomorrow!
      </p>
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onUpdateTask(task.id)}
            className="mr-3"
          />
          <span className="text-lg">{task.taskName}</span>
        </div>
      ))}
    </div>
  );
};

export default DailyTasks;

