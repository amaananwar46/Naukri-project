import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice"
import applicationHistory from "./applicationSlice"
// import ApplicationHistory from "../components/ApplicationHistory";

  const store= configureStore({
    reducer:{
        login: loginReducer,
        applicationHistory: applicationHistory
    }
  })

  export default store;