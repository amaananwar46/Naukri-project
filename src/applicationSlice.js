
import { createSlice } from "@reduxjs/toolkit";

let jobsHistory = createSlice({
    name: "applicationHistory",
    initialState: {
        jobs: [],
        savedJobs: []
    },
    reducers: {
        addJob: (state, action) => {
            localStorage.setItem("appHistory", JSON.stringify(state))
            return {
                // initialstate 
                ...state,
                jobs: [...state.jobs, action.payload]
            }
        },
        addSave: (state, action) => {
            let newSavedJob = [...state.savedJobs, action.payload.newJob]
            localStorage.setItem("savedJobs", JSON.stringify(newSavedJob))
            return {
                ...state,
                savedJobs: newSavedJob
            }
        },
        removeSave: (state, action) => {
            const filteredObj = state.savedJobs.filter((job, index) => index !== action.payload.index)  // Fixed: Use state.savedJobs instead of savedJobs
            localStorage.setItem("savedJobs", JSON.stringify(filteredObj))  // Fixed: JSON.stringify for localStorage
            return {
                ...state,
                savedJobs: filteredObj
            }
        }
    }
})

export const { addJob, addSave, removeSave } = jobsHistory.actions;
export default jobsHistory.reducer;
