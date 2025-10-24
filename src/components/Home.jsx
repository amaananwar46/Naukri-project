import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MyContext } from  '../App';  
import "../StyleSheets/Home.css";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const { jobsArray } = useContext(MyContext);

  const [jobCategory, setjobcategory] = useState([]);

  console.log(jobsArray, "kjhlkjgg ")

  useEffect(() => {
    if (jobsArray.length !== 0) {
      const categoryMap = {};
      console.log(jobsArray.jobs);

      jobsArray.forEach((job) => {
        if (categoryMap[job.category]) {
          categoryMap[job.category]++;
        } else {
          categoryMap[job.category] = 1;
        }
      });

      const updatedCategories = Object.entries(categoryMap).map(
        ([category, count]) => ({
          category,
          numofjobs: count,
        })
      );

      setjobcategory(updatedCategories);
    }
  }, [jobsArray]);

  return (
    <div>
      <div className="cards">
        {jobCategory.length > 0 ? (
          jobCategory.map((job, index) => {
            return (
              <div className="card">
                <h2>{job.category} </h2>
                <p>Around {job.numofjobs}</p>
              </div>
            );
          })
        ) : (
          <p> loading....</p>
        )}
      </div>
    </div>
  );
}
