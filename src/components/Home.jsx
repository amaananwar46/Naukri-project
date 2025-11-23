import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { myContext } from '../App';
import { Link } from 'react-router-dom';
import { GiPreviousButton } from "react-icons/gi";
import { GiNextButton } from "react-icons/gi";
 export default function Home() {
  const isLoggedIn=   useSelector(state=> state.login.isLoggedIn)

 const {jobsArray}=  useContext(myContext)

 const [jobCategory, setjobcategory ]= useState([])

const [hiringCompanies, setHiringCompanies]= useState([])
const [startIndex, setStartIndex] = useState(0)


function nextSlide(){
if(startIndex+ 10 <hiringCompanies.length){
  setStartIndex(prev=>prev+1)
}
}

function prevSlide(){
if(startIndex>0){
setStartIndex(prev=>prev-1)
}
}
 useEffect(()=>{
  async function getHiringComapnies(){
   let res=  await fetch("/companies.json")
  let data= await res.json()
  console.log(data.top_hiring_companies);
  
  setHiringCompanies(data.top_hiring_companies)
  console.log(hiringCompanies);
  
  }
  getHiringComapnies()
 },[])
useEffect(() => {
  if (jobsArray.length !== 0) {
    const categoryMap = {};
console.log(jobsArray.jobs);

    jobsArray.jobs.forEach((job) => {
      if (categoryMap[job.category]) {
        categoryMap[job.category]++;
      } else {
        categoryMap[job.category] = 1;
      }
    });

    const updatedCategories = Object.entries(categoryMap).map(([category, count]) => ({
      category,
      numofjobs: count,
    }));

    setjobcategory(updatedCategories);
  }
}, [jobsArray]);
let [companiesToShow, setCompaniesToShow]= useState([]);

useEffect(()=>{
  if(hiringCompanies.length>0){

  let val= hiringCompanies?.slice(startIndex, startIndex+10)
setCompaniesToShow(val)}

},[hiringCompanies, startIndex])


  // slice  
   return (
     <div className='flex flex-col items-center p-4'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
{
  jobCategory.length>0 ?
  jobCategory.map((job, index)=>{return(

    <Link to={`/jobs/${encodeURIComponent(job.category)}`} key={index}>
      <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">

    <h2 className="text-xl font-bold text-gray-800 mb-2">{job.category} </h2>  
    <p className="text-gray-600">Around {job.numofjobs} jobs</p>

    </div>
    
    </Link>

    )
  
  })
  
  : <p className="text-gray-500"> loading....</p>
}
      </div>

       <div className='flex items-center space-x-4'>
<button onClick={prevSlide} className="text-2xl text-gray-600 hover:text-gray-800 disabled:opacity-50" disabled={startIndex === 0}><GiPreviousButton /></button>
<div className="flex space-x-2 overflow-x-auto">
{
  companiesToShow?.length>0?
  companiesToShow.map((company, index)=>{
    return(
      <Link to={`/top-hiring-company/${encodeURIComponent(company)}`} key={index}>
<li className="list-none bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors duration-200 whitespace-nowrap">{company}</li>
  </Link>   
    )
  })
  : <span className="text-gray-500">loading</span>
}
</div>
<button onClick={nextSlide} className="text-2xl text-gray-600 hover:text-gray-800 disabled:opacity-50" disabled={startIndex + 10 >= hiringCompanies.length}><GiNextButton /></button>
       </div>
       </div>
   )
 }
