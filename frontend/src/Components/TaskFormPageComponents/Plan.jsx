// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTasks } from '../../features/taskSlice';

// const Plan = ({ id, planName, userId }) => {
//   const dispatch = useDispatch();
//   const [showTasks, setShowTasks] = useState(false);
//   const tasks = useSelector((state) => state.tasks.tasks);
//   const status = useSelector((state) => state.tasks.status);
//   const error = useSelector((state) => state.tasks.error);

//   const handleFetchTasks = async () => {
//     await dispatch(fetchTasks({ userId, planId: id }));
//     setShowTasks(true);
//   };

//   const handleCloseTasks = () => {
//     setShowTasks(false);
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
//       <h3 className="text-xl font-semibold text-gray-800 mb-2">{planName}</h3>
//       <button
//         onClick={handleFetchTasks}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
//       >
//         Fetch Tasks
//       </button>
//       <button
//         onClick={handleCloseTasks}
//         className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//       >
//         Close
//       </button>
//       {showTasks && (
//         <div className="mt-4">
//           {status === 'loading' && <p>Loading tasks...</p>}
//           {status === 'succeeded' && (
//             <ul>
//               {tasks.filter(task => task.planId === id).map(task => (
//                 <li key={task.id} className="border-b py-2">
//                   {task.taskName} - {task.completionStatus} - {task.taskType}
//                 </li>
//               ))}
//             </ul>
//           )}
//           {status === 'rejected' && <p>Error fetching tasks: {error}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Plan;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../features/taskSlice';
import TaskList from './TaskList';

const Plan = ({ id, planName, userId }) => {
  const dispatch = useDispatch();
  const [taskDisplaying, setTaskDisplaying] = useState(null); // Stores tasks for the current plan

  const handleFetchTasks = () => {
    dispatch(fetchTasks({ userId, planId: id })).then(response => {
      // Check if the fetch was successful
      if (response.meta.requestStatus === 'fulfilled') {
        setTaskDisplaying(response.payload.tasks); // Set tasks for this plan
      }
    });
  };

  const handleCloseTasks = () => {
    setTaskDisplaying(null); // Clear tasks when closing
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{planName}</h3>
      <button
        onClick={handleFetchTasks}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
      >
        Fetch Tasks
      </button>
      <button
        onClick={handleCloseTasks}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Close
      </button>
      {taskDisplaying && <TaskList tasks={taskDisplaying} />}
    </div>
  );
};

export default Plan;










