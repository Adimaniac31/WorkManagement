import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodaysTasks, fetchDailyTasks, fetchWeeklyTasks } from '../features/taskSlice';
import { fetchPlans } from "../features/planSlice";
import PlanList from '../Components/HomePageComponents/PlanList';
import DailyTasks from '../Components/HomePageComponents/DailyTasks';
import WeeklyPlans from '../Components/HomePageComponents/WeeklyPlans';
import TodaysTasks from '../Components/Common/TodaysTasks'; // Import TodaysTasks component
import SignInPrompt from '../Components/Common/SignInPrompt';
import MindfulnessContent from '../Components/HomePageComponents/MindfulnessContent';
import PageLinks from '../Components/HomePageComponents/PageLinks';
import dailyTasksGif from "../assets/daily-tasks.gif";
import weeklyPlansGif from "../assets/weekly-plans.gif";
import plansGif from "../assets/plans.gif";
import mindfulnessGif from "../assets/mindfulness.gif";

const HomePage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const plans = useSelector((state) => state.plans.plans) || [];
  const dailyTasks = useSelector((state) => state.tasks.dailyTasks) || [];
  const weeklyTasks = useSelector((state) => state.tasks.weeklyTasks) || [];
  const { tasks: todayTasks, status, error } = useSelector((state) => state.tasks); // Today's tasks

  const [videoSource, setVideoSource] = useState(dailyTasksGif);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPlans({ userId }));
      dispatch(fetchDailyTasks({ userId }));
      dispatch(fetchWeeklyTasks({ userId }));
      dispatch(fetchTodaysTasks({ userId })); // Fetch today's tasks
    }
  }, [dispatch, userId]);

  const handleSectionChange = (section) => {
    switch (section) {
      case 'dailyTasks':
        setVideoSource(dailyTasksGif);
        break;
      case 'weeklyPlans':
        setVideoSource(weeklyPlansGif);
        break;
      case 'planList':
        setVideoSource(plansGif);
        break;
      case 'mindfulnessContent':
        setVideoSource(mindfulnessGif);
        break;
      default:
        setVideoSource(dailyTasksGif);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col md:flex-row p-8">
      <div className="flex-1 md:pr-8 space-y-16">
        {userId ? (
          <>
            {/* Today's Tasks */}
            <section id="todaysTasks" className="flex flex-col mb-16" onMouseEnter={() => handleSectionChange('dailyTasks')}>
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
                <TodaysTasks tasks={todayTasks} status={status} error={error} />
              </div>
            </section>

            {/* Daily Tasks */}
            <section id="dailyTasks" className="flex flex-col mb-16" onMouseEnter={() => handleSectionChange('dailyTasks')}>
              <div className="w-full max-w-3xl mx-auto">
                <DailyTasks tasks={dailyTasks} />
              </div>
            </section>

            {/* Weekly Plans */}
            <section id="weeklyPlans" className="flex flex-col mb-16" onMouseEnter={() => handleSectionChange('weeklyPlans')}>
              <div className="w-full max-w-3xl mx-auto">
                <WeeklyPlans plans={weeklyTasks} />
              </div>
            </section>

            {/* Plan List */}
            <section id="planList" className="flex flex-col mb-16" onMouseEnter={() => handleSectionChange('planList')}>
              <div className="w-full max-w-3xl mx-auto">
                <PlanList plans={plans} />
              </div>
            </section>

            {dailyTasks.length === 0 && weeklyTasks.length === 0 && plans.length === 0 && (
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-6">You have no tasks or plans yet</h2>
                <p className="text-xl">
                  Start by creating a task or plan to manage your activities. 
                </p>
              </div>
            )}
          </>
        ) : (
          <SignInPrompt />
        )}

        <section id="mindfulnessContent" className="flex flex-col mb-16" onMouseEnter={() => handleSectionChange('mindfulnessContent')}>
          <MindfulnessContent />
        </section>

        <PageLinks />
      </div>

      <div className="hidden md:block md:w-1/3 flex-shrink-0 sticky top-8 h-screen flex justify-center items-start">
        <div className="w-full h-auto p-6 rounded-md shadow-lg bg-white">
          <img src={videoSource} alt="Section video" className="w-full h-auto rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;