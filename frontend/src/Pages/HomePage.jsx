import React, { useEffect, useState } from 'react';
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
import dailyTasksGif from "../assets/daily-tasks.gif";
import weeklyPlansGif from "../assets/weekly-plans.gif";
import plansGif from "../assets/plans.gif";
import mindfulnessGif from "../assets/mindfulness.gif";

const HomePage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const plans = useSelector((state) => state.plans.plans);
  const dailyTasks = useSelector((state) => state.tasks.dailyTasks);
  const weeklyTasks = useSelector((state) => state.tasks.weeklyTasks);

  const [videoSource, setVideoSource] = useState(dailyTasksGif);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPlans({ userId }));
      dispatch(fetchDailyTasks({ userId }));
      dispatch(fetchWeeklyTasks({ userId }));
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
    <div className="min-h-screen bg-background text-textPrimary flex p-8">
      <div className="w-2/3 pr-8 space-y-16">
        {userId ? (
          plans.length === 0 && (dailyTasks.length === 0 && weeklyTasks.length === 0) ? (
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-6">You have no tasks or plans yet</h2>
              <p className="text-xl">
                Start by creating a task or plan to manage your activities. 
                <Link to="/taskform-page" className="text-blue-600 underline ml-2">
                  Go to Task Form Page
                </Link>
              </p>
            </div>
          ) : (
            <>
              <section id="dailyTasks" className="flex items-center" onMouseEnter={() => handleSectionChange('dailyTasks')}>
                <div className="w-full">
                  <DailyTasks tasks={dailyTasks} />
                </div>
              </section>

              <section id="weeklyPlans" className="flex items-center" onMouseEnter={() => handleSectionChange('weeklyPlans')}>
                <div className="w-full">
                  <WeeklyPlans plans={weeklyTasks} />
                </div>
              </section>

              <section id="planList" className="flex items-center" onMouseEnter={() => handleSectionChange('planList')}>
                <div className="w-full">
                  <PlanList plans={plans} />
                </div>
              </section>
            </>
          )
        ) : (
          <SignInPrompt />
        )}

        <section id="mindfulnessContent" className="flex items-center" onMouseEnter={() => handleSectionChange('mindfulnessContent')}>
          <div className="w-full">
            <MindfulnessContent />
          </div>
        </section>

        <PageLinks />
      </div>

      <div className="w-1/3 sticky top-8 h-screen flex justify-center items-start">
        <div className="w-5/6 h-auto p-6 rounded-md shadow-lg bg-white">
          <img src={videoSource} alt="Section video" className="w-full h-auto rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
