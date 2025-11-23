import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { myContext } from '../App';
 
 export default function TitleJob() {
   const {title}=  useParams()
   const decodedTitle= decodeURIComponent(title)


  const {jobsArray}= useContext(myContext)
const [filteredJobs, setFilteredJobs] = useState([])



useEffect(()=>{
const filteredData= jobsArray?.jobs?.filter((job)=>{
  return job.title== decodedTitle
})
setFilteredJobs(filteredData)
},[jobsArray,decodedTitle])

  return (
     <div className="max-w-4xl mx-auto p-6">
       <h1 className="text-2xl font-bold text-gray-800 mb-6">Jobs for: {decodedTitle}</h1>
      {
        filteredJobs?.length>0?
        <ul className="space-y-4">
          {filteredJobs.map((job, index)=>{
            return (
              <li key={index} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.company_name}</p>
                <a href={job.url} className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">apply here</a>
              </li>
            )
          })}
        </ul>
        : <p className="text-gray-500 text-center text-lg">try again later ...</p>
      }
     </div>
   )
 }
