import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { myContext } from '../App';
import { useDispatch } from 'react-redux';
 
export default function TopCompanydata() {
  const { company } = useParams();
  const decodeCompany = decodeURIComponent(company);
  console.log(decodeCompany);

  const dispatch = useDispatch();
  const { jobsArray } = useContext(myContext);
  console.log(jobsArray?.jobs);

  const [jobsAvailable, setJobsAvailable] = useState([]);

  useEffect(() => {
    if (jobsArray?.jobs?.length > 0) {
      let filteredData = jobsArray?.jobs?.filter(
        (job) =>
          String(job.company_name).toLowerCase() ===
            String(decodeCompany).toLowerCase() ||
          job.company_name
            .toLowerCase()
            .includes(decodeCompany.toLowerCase()) ||
          decodeCompany
            .toLowerCase()
            .includes(job.company_name.toLowerCase())
      );
      console.log(filteredData);
      setJobsAvailable(filteredData);
    }
  }, []);

  useEffect(() => {
    console.log(jobsAvailable);
  }, [jobsAvailable]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {jobsAvailable?.length > 0 ? (
        jobsAvailable.map((job) => {
          return (
            <div className="bg-white shadow-lg rounded-lg p-6" key={job.id}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{job.title}</h2>
              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{
                  __html: job && job?.description,
                }}
              ></div>
              <a
                href={job.url}
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                onClick={() => dispatch(addJob(job))}
                target="_blank"
                rel="noopener noreferrer"
              >
                Proceed to Apply
              </a>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center text-lg">
          Sorry, no jobs available in the company <span className="font-semibold text-gray-700">{decodeCompany}</span> at
          this moment.
        </p>
      )}
    </div>
  );
}

