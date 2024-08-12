/*  map all plans that already exists along with tasks inside it
    Add plan button below it to create new plan
    When the add plan button is clicked open a Form to add tasks in there
*/

// TaskFormPage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlans } from '../features/planSlice';
import Plan from '../Components/TaskFormPageComponents/Plan';
// import NewPlanForm from '../Components/TaskFormPageComponents/NewPlanForm';

const TaskFormPage = () => {
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const plans = useSelector(state => state.plans.plans);
  const planStatus = useSelector(state => state.plans.status);
  const error = useSelector(state => state.plans.error);

  useEffect(() => {
    if (planStatus === 'idle' && userId) {
      dispatch(fetchPlans({ userId }));
    }
  }, [planStatus, dispatch, userId]);

  if (planStatus === 'loading') return <div className="text-center text-gray-700">Loading...</div>;
  if (planStatus === 'failed') return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* <NewPlanForm userId={userId} /> */}
      <div className="flex flex-col items-center">
        {plans && plans.length > 0 ? (
          plans.map(plan => (
            <Plan key={plan.id} plan={plan} />
          ))
        ) : (
          <div className="text-center text-gray-600">No plans available</div>
        )}
      </div>
    </div>
  );
};

export default TaskFormPage;




