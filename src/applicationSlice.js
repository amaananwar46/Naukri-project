import { createSlice } from "@reduxjs/toolkit";

let jobsHistory = createSlice({
    name: "applicationHistory",
    initialState: {
        jobs: [],
        savedJobs: []
    },
    reducers: {
        addJob: (state, action) => {
            const newState = {
                ...state,
                jobs: [...state.jobs, action.payload]
            };
            localStorage.setItem("appHistory", JSON.stringify(newState));  // Update localStorage after state change
            return newState;
        },
        addSave: (state, action) => {
            let newSavedJob = [...state.savedJobs, action.payload.newJob];
            localStorage.setItem("savedJobs", JSON.stringify(newSavedJob));
            return {
                ...state,
                savedJobs: newSavedJob
            };
        },
        removeSave: (state, action) => {
            const filteredObj = state.savedJobs.filter((job, index) => index !== action.payload.index);
            localStorage.setItem("savedJobs", JSON.stringify(filteredObj));
            return {
                ...state,
                savedJobs: filteredObj
            };
        },
        // Added setSavedJobs to load from localStorage on app start
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload;
        },
        // Optionally, add setJobs for appHistory if needed
        setJobs: (state, action) => {
            state.jobs = action.payload;
        }
    }
});

export const { addJob, addSave, removeSave, setSavedJobs, setJobs } = jobsHistory.actions;
export default jobsHistory.reducer;

