import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlans } from '../features/planSlice';
import { fetchDailyTasks, fetchWeeklyTasks } from '../features/taskSlice';
import PlanList from '../Components/HomePageComponents/PlanList';
import DailyTasks from '../Components/HomePageComponents/DailyTasks';
import WeeklyPlans from '../Components/HomePageComponents/WeeklyPlans';
import SignInPrompt from '../Components/HomePageComponents/SignInPrompt';
import MindfulnessContent from '../Components/HomePageComponents/MindfulnessContent';
import PageLinks from '../Components/HomePageComponents/PageLinks';

const HomePage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const plans = useSelector((state) => state.plans.plans);
  const dailyTasks = useSelector((state) => state.tasks.dailyTasks);
  const weeklyTasks = useSelector((state) => state.tasks.weeklyTasks);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPlans({ userId }));
      // dispatch(fetchTasks({ userId }));
      dispatch(fetchDailyTasks({ userId }));
      dispatch(fetchWeeklyTasks({ userId }));
    }

    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-section');

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          element.classList.add('animate-fadeIn');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check in case the element is already in view
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, userId]);

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {userId ? (
        plans.length === 0 && (dailyTasks.length === 0 && weeklyTasks.length === 0) ? (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">You have no tasks or plans yet</h2>
            <p className="text-lg">
              Start by creating a task or plan to manage your activities. 
              <Link to="/taskform-page" className="text-blue-500 underline ml-2">
                Go to Task Form Page
              </Link>
            </p>
          </div>
        ) : (
          <>
            <section
              id="dailyTasks"
              className="fade-in-section flex items-center opacity-0"
            >
              <div className="w-1/2">
                <DailyTasks tasks={dailyTasks} />
              </div>
              <div className="w-1/2">
                <video src="/path/to/daily-tasks-video.mp4" autoPlay loop muted className="w-full h-auto" />
              </div>
            </section>

            <section
              id="weeklyPlans"
              className="fade-in-section flex items-center opacity-0"
            >
              <div className="w-1/2">
                <WeeklyPlans plans={weeklyTasks} />
              </div>
              <div className="w-1/2">
                <video src="/path/to/weekly-plans-video.mp4" autoPlay loop muted className="w-full h-auto" />
              </div>
            </section>

            <section
              id="planList"
              className="fade-in-section flex items-center opacity-0"
            >
              <div className="w-1/2">
                <PlanList plans={plans} />
              </div>
              <div className="w-1/2">
                <video src="/path/to/plans-video.mp4" autoPlay loop muted className="w-full h-auto" />
              </div>
            </section>
          </>
        )
      ) : (
        <SignInPrompt />
      )}

      <section
        id="mindfulnessContent"
        className="fade-in-section flex items-center opacity-0"
      >
        <div className="w-1/2">
          <MindfulnessContent />
        </div>
        <div className="w-1/2">
          <video src="/path/to/mindfulness-video.mp4" autoPlay loop muted className="w-full h-auto" />
        </div>
      </section>

      <PageLinks />
    </div>
  );
};

export default HomePage;









