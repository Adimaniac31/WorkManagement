import React from 'react';

const DailyTasks = ({ tasks, onUpdateTask }) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Daily Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onUpdateTask(task.id)}
          />
          <span className="ml-2">{task.taskName}</span>
        </div>
      ))}
    </div>
  );
};

export default DailyTasks;
