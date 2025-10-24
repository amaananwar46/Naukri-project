import React, { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Settings from './components/Settings'
import Navbar from './components/Navbar'
import Jobs from './components/Jobs'
import ApplySection from './components/ApplySection'


export const MyContext= createContext()

export default function App() {
const [jobsArray,setJobs]=  useState([])
 useEffect(()=>{
    async function gettingJobs(){
 fetch('https://remotive.com/api/remote-jobs?category=all&limit=1000')
  .then(res => res.json())
  .then(data => {
   setJobs(data.jobs)
   console.log(data, "alksdjfdskl")
   console.log(jobsArray)

   })
  .catch(err => console.error(err));
}
gettingJobs()
  },[])
  return (
    <div>

<MyContext.Provider value={{jobsArray}}>
  <Navbar/>
<Routes>
  <Route path="/" element={<Home/>}/>
<Route path='/help-centre' element={<Settings/>}/>
<Route path='/jobs/:category' element={<Jobs/>}/>
<Route path='/applyto/:id' element={<ApplySection/>}/>
</Routes>

</MyContext.Provider>






    </div>
  )
}