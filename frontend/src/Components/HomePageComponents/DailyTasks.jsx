import React from 'react';

const DailyTasks = ({ tasks, onUpdateTask }) => {
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
              checked={task.completed}
              onChange={() => onUpdateTask(task.id)}
              className="mr-3 h-5 w-5"
            />
            <span className="text-base md:text-lg">{task.taskName}</span>
          </div>
        ))
      ) : (
        <p className="text-lg">No tasks available. Enjoy your day!</p>
      )}
    </div>
  );
};

export default DailyTasks;