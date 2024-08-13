import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className="mt-4">
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border-b py-2">
            {task.taskName} - {task.completionStatus} - {task.taskType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
