import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodaysTasks } from '../features/taskSlice';
import TodaysTasks from '../Components/Common/TodaysTasks';
import MindfulnessContent from '../Components/MindfulnessPageComponents/MindfulnessContent';
import MindfulnessPractices from '../Components/MindfulnessPageComponents/MindfulnessPractices';

const MindfulnessPage = () => {
  const [feelings, setFeelings] = useState('');
  const userId = localStorage.getItem('userId'); 
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    setFeelings(localStorage.getItem('feelings') || '');
    if (userId) {
      dispatch(fetchTodaysTasks({ userId }));
    }
  }, [dispatch, userId]);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Your Mood While Signing Up</h2>
      <p>{feelings ? feelings : 'No mood recorded.'}</p>
      
      <h2 className="text-xl font-semibold">Today's Tasks</h2>
      <TodaysTasks tasks={tasks} status={status} error={error} />

      <MindfulnessContent />
      <MindfulnessPractices />
    </div>
  );
};

export default MindfulnessPage;