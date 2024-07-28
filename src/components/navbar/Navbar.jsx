// src/Navbar.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../../redux/userSlice';
import { motion } from "framer-motion";
import { FiDelete, FiMoon, FiPlus, FiSun } from "react-icons/fi";
import { useUiContext } from "../../contexts/UiContext";
import { actioTypes } from "../../reducers/uiReducer";
import SearchBar from "./SearchBar"
const Navbar = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.user?.user?._id);
  const token = useSelector((state) => state.user?.user?.token);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${userId}`, {
          headers: {
            Authorization: token,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return (
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-lg font-bold">MyApp</Link>
        </div>
        <div className="text-white">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="navbar fixed w-full z-10 top-0 left-0 px-[2%]  md:px-[6%] flex-center-between py-[0.35rem] bg-white dark:bg-dark-card border-b dark:border-slate-800">
    <div>
      <Link to="/" className="text-white text-lg font-bold">MyApp</Link>
    </div>

    <SearchBar />
    <div className="flex items-center">
      {user ? (
        <>
        <Link to={`/profile/${userId}`} className="relative w-10 h-10">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto.url}
              alt="Profile"
              className="rounded-full h-full w-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-300 rounded-full">
              {/* Placeholder for users without profile photo */}
              <span className="text-gray-600">No Photo</span>
            </div>
          )}
        </Link>
       
        <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700"></div>
        <button onClick={handleLogout} className="ml-4 text-white">Logout</button>
        </>
      ) : (
        <Link to="/login" className="text-white">Login</Link>
      )}
    </div>
  </nav>
  );
};

export default Navbar;

