import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlans, createPlan } from '../features/planSlice';
import { createTask } from '../features/taskSlice';
import Plan from '../Components/TaskFormPageComponents/Plan';
import CreatePlan from '../Components/TaskFormPageComponents/CreatePlan';
import CreateTask from '../Components/TaskFormPageComponents/CreateTask';
import SignInPrompt from '../Components/Common/SignInPrompt'; // Import the SignInPrompt component

const TaskFormPage = () => {
  const dispatch = useDispatch();
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [formError, setFormError] = useState(null);

  const userId = localStorage.getItem('userId'); // Get userId from localStorage
  const plans = useSelector(state => state.plans.plans);
  const planStatus = useSelector(state => state.plans.status);
  const error = useSelector(state => state.plans.error);

  useEffect(() => {
    if (planStatus === 'idle' && userId) {
      dispatch(fetchPlans({ userId })).catch((err) => setFormError(err.message));
    }
  }, [planStatus, dispatch, userId]);

  const handleCreatePlan = async (planData) => {
    try {
      const action = await dispatch(createPlan({ userId, ...planData }));
      if (action.error) {
        throw new Error(action.error.message);
      }
      const newPlanId = action.payload.id;
      setCurrentPlanId(newPlanId);
      setIsCreatingPlan(false);
      setIsCreatingTask(true);
      setFormError(null);
    } catch (error) {
      setFormError('Failed to create plan: ' + error.message);
    }
  };

  const handleAddTask = async (tasks) => {
    try {
      for (const task of tasks) {
        const action = await dispatch(createTask({ userId, ...task }));
        if (action.error) {
          throw new Error(action.error.message);
        }
      }
      setIsCreatingTask(false);
      setCurrentPlanId(null);
      setFormError(null);
    } catch (error) {
      setFormError('Failed to add tasks: ' + error.message);
    }
  };

  const handleCloseCreatePlan = () => {
    setIsCreatingPlan(false);
    setFormError(null);
  };

  const handleCloseCreateTask = () => {
    setIsCreatingTask(false);
    setCurrentPlanId(null);
    setFormError(null);
  };

  if (!userId) {
    // If the user is not signed in, display the SignInPrompt
    return <SignInPrompt />;
  }

  return (
    <div className="min-h-screen p-6 bg-background">
      {isCreatingPlan ? (
        <CreatePlan onCreatePlan={handleCreatePlan} onClose={handleCloseCreatePlan} />
      ) : (
        <button
          onClick={() => setIsCreatingPlan(true)}
          className="bg-backgroundBtn text-white px-6 py-3 rounded-lg hover:bg-[#ce4263] mb-6 font-serif"
        >
          Add a Plan
        </button>
      )}

      {isCreatingTask && (
        <CreateTask planId={currentPlanId} onAddTask={handleAddTask} onClose={handleCloseCreateTask} />
      )}

      {formError && <div className="text-center text-red-700 font-semibold mb-4">{formError}</div>}

      <div className="flex flex-col flex-start mt-6 gap-2">
        <h1 className="text-2xl font-bold text-black mb-2 font-serif">Your Plans:</h1>
        {planStatus === 'loading' && <div className="text-center text-gray-700 font-medium">Loading...</div>}
        {planStatus === 'failed' && <div className="text-center text-red-700 font-medium">Error: {error}</div>}
        {plans.length === 0 && planStatus === 'succeeded' && (
          <div className="text-center text-gray-600 font-medium">No plans available.</div>
        )}
        {plans.map(plan => (
          <div key={plan.id} className="mb-6 w-full">
            <Plan id={plan.id} plan={plan} userId={userId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskFormPage;