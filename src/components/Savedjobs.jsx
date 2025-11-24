import React, { useState, useEffect } from 'react';  // Added useEffect
import { useDispatch, useSelector } from 'react-redux';
import { removeSave } from '../applicationSlice';
import { Link } from 'react-router-dom';

export default function Savedjobs() {
  const { savedJobs } = useSelector(state => state.applicationHistory);
  const dispatch = useDispatch();
  
  // Use Redux state as the single source of truth, and sync localStorage in useEffect
  const [savedJobss, setSavedJob] = useState(savedJobs || []);

  // Sync local state with Redux state on changes
  useEffect(() => {
    setSavedJob(savedJobs || []);
  }, [savedJobs]);

  // Also, update localStorage whenever savedJobss changes
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobss));
  }, [savedJobss]);

  const handleRemove = (index) => {
    dispatch(removeSave({ index }));  // Dispatch to Redux (assuming it updates the state correctly)
    // Local state will update via useEffect when Redux state changes
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Saved Jobs</h1>
      {
        savedJobss.length > 0 ?
        <ul className="space-y-4">
          {savedJobss.map((job, index) => {
            return (
              <li key={job.id || index} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                <Link to={`/applyto/${encodeURIComponent(job?.category)}/${job?.id}`} className="flex-1">
                  <span className="text-lg font-medium text-gray-700">{job.title}</span>
                </Link>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();  // Prevent event bubbling to the Link
                    handleRemove(index);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors ml-4"
                >
                  Remove from save
                </button>
              </li>
            );
          })}
        </ul>
        : <p className="text-gray-500 text-center text-lg">No saved jobs yet</p>
      }
    </div>
  );
}
