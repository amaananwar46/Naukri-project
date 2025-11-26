import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addJob } from "./applicationSlice";
import { useDispatch } from "react-redux";
export default function ApplySection() {
  const isLoggedin = JSON.parse(localStorage.getItem("user")) || null;
  const { category, id } = useParams();
  let decodedCategory = decodeURIComponent(category);
  console.log(decodedCategory, id);
  let [categoryJobs, setCategoryjobs] = useState([]);
  let [desiredJob, setDesiredJob] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      try {
        let res = await fetch(
          `https://remotive.com/api/remote-jobs?category=${decodedCategory}&limit=1000`
        );
        let data = await res.json();
        setCategoryjobs(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [category]);

  useEffect(() => {
    let filteredJob = categoryJobs?.jobs?.filter(
      (job) => Number(job.id) === Number(id)
    );
    // console.log(filteredJob, "thiis is filter jobs")
    setDesiredJob(filteredJob);
    // console.log("job set ho chuki h", desiredJob); 
  }, [id, categoryJobs]);

  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {desiredJob != null ? (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            {desiredJob[0]?.title}
          </h2>
          <h2 className="text-xl text-gray-600">
            {desiredJob[0]?.company_name}
          </h2>
          <div
            className="job-description prose prose-gray max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: desiredJob && desiredJob[0]?.description,
            }}
          ></div>

          {isLoggedin === null ? (
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              {" "}
              login to proceed{" "}
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(addJob(desiredJob[0]));
                window.open(desiredJob[0].url, "_blank");
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              proceed to apply
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">loading.... </p>
      )}
    </div>
  );
}
