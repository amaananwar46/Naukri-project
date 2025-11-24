





import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSave, setSavedJobs } from '../applicationSlice';  // Import setSavedJobs
import { Link } from 'react-router-dom';

export default function Savedjobs() {
  const { savedJobs } = useSelector(state => state.applicationHistory);
  const dispatch = useDispatch();
  
  // Initialize local state with localStorage data
  const [savedJobss, setSavedJob] = useState(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    return jobs;
  });

  // On mount, load from localStorage and dispatch to Redux to sync
  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    dispatch(setSavedJobs(jobs));  // Sync Redux with localStorage
  }, [dispatch]);

  // Sync local state with Redux state on changes (e.g., if updated elsewhere)
  useEffect(() => {
    setSavedJob(savedJobs || []);
  }, [savedJobs]);

  // Update localStorage whenever savedJobss changes
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobss));
  }, [savedJobss]);

  const handleRemove = (index) => {
    // Update local state
    const updatedJobs = savedJobss.filter((_, i) => i !== index);
    setSavedJob(updatedJobs);
    
    // Dispatch to Redux
    dispatch(removeSave({ index }));
    
    // localStorage will update via useEffect
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
                    e.stopPropagation();
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
