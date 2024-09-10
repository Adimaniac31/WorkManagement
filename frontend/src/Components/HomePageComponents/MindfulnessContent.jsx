import React from 'react';

const MindfulnessContent = () => {
  return (
    <div className="w-full p-6 bg-yellow-100 rounded-md mt-10 shadow-md mx-auto max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6">Mindfulness and Productivity</h2>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
        Mindfulness is a transformative practice that sharpens focus, enhances productivity, 
        and brings a sense of calm to even the busiest of days. By being fully present in 
        each moment, you can make better decisions, reduce stress, and achieve your goals 
        with more ease and clarity.
      </p>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
        Taking just a few minutes each day to practice mindfulness can help you regain control 
        of your thoughts and actions, preventing burnout and keeping your energy levels high. 
        Whether through meditation, mindful breathing, or simply focusing on a task without 
        distraction, these small habits can lead to big changes.
      </p>
      <blockquote className="mt-6 p-4 italic font-light border-l-4 border-yellow-500 bg-yellow-50">
        "The mind is everything. What you think, you become." — Buddha
      </blockquote>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
        Explore our mindfulness resources and learn how to incorporate these techniques into 
        your daily routine to enhance your productivity while nurturing your mental well-being. 
        Remember, staying calm and focused today leads to greater achievements tomorrow.
      </p>
      <div className="mt-6 text-center">
        <a 
          href="/mindfulness"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Learn More About Mindfulness
        </a>
      </div>
    </div>
  );
};

export default MindfulnessContent;