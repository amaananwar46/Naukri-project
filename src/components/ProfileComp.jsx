import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { removeUser } from "../toolkit/LoginSlice.js";
export default function ProfileComp({ setIsProfileOpen }) {
  const dispatch = useDispatch();
  const userLoggedIn = JSON.parse(localStorage.getItem("user")) || null;
  const user = useSelector((state) => state.login.user);
  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 z-50 flex flex-col">
      <button
        onClick={() => setIsProfileOpen(false)}
        className="self-end text-gray-500 hover:text-gray-700 mb-4"
      >
        <RxCross1 size={24} />
      </button>
      {userLoggedIn ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {" "}
            {userLoggedIn.displayName}{" "}
          </h2>
          <p className="text-gray-600 mb-4"> full stack developer </p>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mb-4">
            application history
          </button>
        </>
      ) : (
        <button 
      className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors mb-4">
          {" "}
          pls login to proceed{" "}
        </button>
      )}

      <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors mb-4">
        view & update profile{" "}
      </button>
      <Link to="/help-centre" className="w-full">
        <button
          onClick={() => setIsProfileOpen(false)}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors mb-4"
        >
          help centre
        </button>
      </Link>
      <button
        className={
          userLoggedIn
            ? "w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            : "w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
        }
        onClick={async () => {
          await signOut(auth);
          localStorage.removeItem("user");
          dispatch(removeUser());
          setIsProfileOpen(false);
        }}
      >
        logout
      </button>
    </div>
  );
}
