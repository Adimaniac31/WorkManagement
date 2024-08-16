import React, { useState } from 'react';

const CreatePlan = ({ onCreatePlan, onClose }) => {
  const [planName, setPlanName] = useState('');
  const [planType, setPlanType] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      onCreatePlan({ planName, planType });
    } catch (error) {
      setError('Failed to create plan. Please try again.');
    }
  };

  const handleClose = () => {
    setPlanName('');
    setPlanType('');
    setError(null);
    if (onClose) onClose(); // Call the onClose callback
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Create New Plan</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Plan Name</label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Plan Type</label>
          <select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            required
          >
            <option value="" disabled>Select Plan Type</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
        >
          Create Plan
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default CreatePlan;




