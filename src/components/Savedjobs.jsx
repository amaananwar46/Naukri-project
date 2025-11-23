import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSave } from '../toolkit/applicationSlice';
import { Link } from 'react-router-dom';

export default function Savedjobs() {
  const { savedJobs } = useSelector(state => state.applicationHistory);
  const jobs = JSON.parse(localStorage.getItem("savedJobs"));
  const [savedJobss, setSavedJob] = useState(jobs || savedJobs);
  const dispatch = useDispatch();

  const handleRemove = (index) => {
    dispatch(removeSave({ index }));  // Dispatch to Redux
    // Update local state to reflect the change
    const updatedJobs = savedJobss.filter((_, i) => i !== index);
    setSavedJob(updatedJobs);
    // Optionally update localStorage
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Saved Jobs</h1>
      {
        savedJobss.length > 0 ?
        <ul className="space-y-4">
          {savedJobss.map((job, index) => {
            return (

             <Link to={`/applyto/${encodeURIComponent(job?.category)}/${job?.id} `} key={index}>
             
             
              <li  className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">{job.title}</span>
                <button 
                  onClick={() => handleRemove(index)}  // Use the new handler
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                  Remove from save
                </button>
              </li>
                  </Link>

            );
          })}
        </ul>
        : <p className="text-gray-500 text-center text-lg">No saved jobs yet</p>
      }
    </div>
  );
}
