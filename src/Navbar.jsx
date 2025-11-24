

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
// import { userSearch } from "../toolkit/SearchSlice";
import ProfileComp from "./components/ProfileComp";
import Overlay from "./components/Overlay";
import { Link } from "react-router-dom";
import { myContext } from "./App";

export default function Navbar() {
  const [Visible, setVisible] = useState([false, false]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  let [userSearch, setUserSearch] = useState("");
  const { jobsArray } = useContext(myContext);

  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (userSearch.trim() == "") {
      setShowSuggestions(false);
      return;
    }

    let filteredArray = jobsArray.jobs
      ?.filter((job) => {
        const title = job.title
          .toLowerCase()
          .includes(userSearch.toLowerCase());
        const company = job.company_name
          .toLowerCase()
          .includes(userSearch.toLowerCase());
        return title || company;
      })
      .filter((job, index, arr) => {
        // arr - findIndex (first index )
        return (
          index ===
          arr.findIndex((filteredJob) => filteredJob.title === job.title)
        );
      });

    let array = filteredArray.slice(0, 10);
    setFilteredData(array);
  }, [userSearch]);
  const dispatch = useDispatch();
  let userLoggedIn = JSON.parse(localStorage.getItem("user")) || null;
  // npm i react-icons

  return (
    <>
      <div className="bg-white shadow-md px-4 py-2 flex justify-between items-center relative">
        {isProfileOpen ? (
          <>
            <Overlay setIsProfileOpen={setIsProfileOpen} />
            <ProfileComp setIsProfileOpen={setIsProfileOpen} />{" "}
          </>
        ) : null}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button className="text-xl font-bold text-blue-600">naukri</button>
          </div>
        

          
        <Link to='/'>
          <button className="text-gray-700 hover:text-blue-600"> Home {" "}
          </button>

        </Link>


        
        


           
          {/* Added Saved Jobs button here, next to Companies */}
          {userLoggedIn && (
            <Link to="/savedjobs">
              <button className="text-gray-700 hover:text-blue-600">
                Saved Jobs
              </button>
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-2 relative">
          <input
            type="text"
            name=""
            id=""
            placeholder="search job here"
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setUserSearch(e.target.value);
              setShowSuggestions(true);
            }}
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            <FaSearch />
          </button>
        </div>
        <ul className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded shadow-md w-64 max-h-60 overflow-y-auto z-10">
          {showSuggestions &&
            (filteredData.length > 0 ? (
              filteredData.map((job) => (
                <Link to={`/search/${encodeURIComponent(job.title)}`}>
                  {" "}
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowSuggestions(false)}
                  >
                    {job.title}
                  </li>{" "}
                </Link>
              ))
            ) : (
              <p className="px-4 py-2 text-gray-500">no search found</p>
            ))}
        </ul>
        <div className="flex items-center space-x-4">
          {userLoggedIn ? (
            <p className="text-green-600">
              {" "}
              Welcome {userLoggedIn?.displayName}
            </p>
          ) : (
            <div className="flex space-x-2">
              <Link to="/register">
                <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                  register
                </button>
              </Link>
            </div>
          )}
          <button
            className="text-gray-700 text-xl"
            onClick={() => setIsProfileOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      <div
        className="absolute top-full left-0 bg-white border border-gray-300 rounded shadow-md w-48 z-10"
        onMouseLeave={() => setVisible([false, false])}
      >
        {Visible[0] ? (
          <div className="py-2 mt-5  bg-blue-500">
            <Link to="/savedjobs">
              {" "}
              <li className="px-4 py-1 hover:bg-gray-200 cursor-pointer">
                saved jobs{" "}
              </li>{" "}
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}




