import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { myContext } from "../App";
import { useDispatch } from "react-redux";
import { addSave } from "../applicationSlice";

export default function Jobs() {
  const { category } = useParams();
  console.log(category);
  const dispatch = useDispatch();
  const decodedCategory = decodeURIComponent(category);
  const { jobsArray } = useContext(myContext);
  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    const filteredArray = jobsArray?.jobs?.filter(
      (job) => job.category === decodedCategory
    );
    setFilteredJobs(filteredArray);
  }, [category]);

  return (
    <div className="flex flex-col space-y-4 p-4">
      {filteredJobs?.length > 0 ? (
        filteredJobs?.map((job) => {
          const publishedDate = new Date(job.publication_date);
          const now = new Date();
          const diffMs = now - publishedDate;
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          return (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-6 mb-4"
            >
              <Link
                to={`/applyto/${encodeURIComponent(job.category)}/${job.id}`}
                className="block text-blue-600 hover:text-blue-800"
              >
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <span className="text-gray-700 block mb-1">
                  {job.company_name}
                </span>
                <p className="text-gray-600 mb-1">{`${job.tags.join(
                  " , "
                )}`}</p>
                {job.salary == "" ? (
                  <p className="text-gray-500 mb-1">not disclosed</p>
                ) : (
                  <p className="text-green-600 font-semibold mb-1">
                    {job.salary}
                  </p>
                )}
                {
                  <p className="text-gray-500 text-sm">
                    Posted {diffDays} days ago
                  </p>
                }
              </Link>
              <div className="flex justify-between w-48 mt-4">
                {/* <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">hide</button> */}

                <button
                  onClick={() => {
                    alert("job saved !!");
                    dispatch(
                      addSave({
                        newJob: job,
                      })
                    );
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  {" "}
                  save{" "}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center"> try again later...</p>
      )}
    </div>
  );
}
