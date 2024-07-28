import { useEffect, useState } from "react";
import axios from 'axios';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import Background from "../../images/background.png"
import {
    FiChevronsRight,
    FiChevronsLeft,
    FiChevronDown,
    FiDelete,
  } from "react-icons/fi";
  import { BiFilterAlt } from "react-icons/bi";
  import { actioTypes } from "../../reducers/uiReducer";
  import { useUiContext } from "../../contexts/UiContext";

  import FilterSidebar from './FilterSidebar';
  import JobListings from './JobListings';

const Test = () => {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState({
      jobTitle: '',
      jobType: '',
      location: '',
  });
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch all jobs from the API
  const fetchJobs = async (page, limit) => {
      try {
          const response = await axios.get(`http://localhost:4000/api/jobs/all?page=${page}&limit=${limit}`);
          const { jobs, totalPages, currentPage } = response.data;
          setJobs(jobs);
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
          setLoading(false);
      } catch (error) {
          setError('Error fetching jobs');
          setLoading(false);
      }
  };

  // Fetch jobs on component mount and when page changes
  useEffect(() => {
      fetchJobs(currentPage, 10);
  }, [currentPage]);

  // Function to fetch filtered jobs from the API
  const fetchFilteredJobs = async () => {
      try {
          const response = await axios.get('http://localhost:4000/api/jobs/filter', {
              params: {
                  ...searchQuery,
                  ...filters
              }
          });
          setJobs(response.data);
      } catch (error) {
          console.error('Error fetching filtered jobs:', error);
      }
  };

  // Fetch filtered jobs whenever filters or search query change
  useEffect(() => {
      fetchFilteredJobs();
  }, [filters, searchQuery]);

  // Function to apply new filters
  const handleApplyFilters = (newFilters) => {
      setFilters(newFilters);
  };

  // Function to reset filters
  const handleResetFilters = () => {
      setFilters({});
      setSearchQuery({
          jobTitle: '',
          jobType: '',
          location: '',
      });
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
      const { name, value } = e.target;
      setSearchQuery({ ...searchQuery, [name]: value });
  };

  // Function to handle search form submission
  const handleSearchSubmit = (e) => {
      e.preventDefault();
      fetchFilteredJobs();
  };



  // Function to handle page change
  const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
  };

  const { isFilterMenuOpen, dispatch } = useUiContext();
  const handleCloseFiltermenu = (e) => {
    if (e.target.classList.contains("filter-modal"))
      dispatch({ type: actioTypes.closeFilterMenu });
  };
    return(
      <div className="px-[2%]  md:px-[6%] ">
      
      <div className="w-full">
      <div
      
        className="relative rounded-lg text-slate-300 w-full h-[100px]"
      >
      <img src={Background} className="absolute  w-full h-full top-0 left-0 right-0" />
        <div className=" absolute px-6 pt-4">
          <h1 className="font-bold text-2xl">Let's find your dream Job</h1>
          <p>Tuesday, 24 Jan 2023</p>
        </div>
       
</div>
      <form onSubmit={handleSearchSubmit} className="mb-4 flex-center-between relative flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 md:bg-white shadow-none md:dark:shadow-none md:dark:bg-dark-card rounded-lg px-4 py-2">
    <div className="flex items-center mb-2 space-x-2">
        <div className="relative filter">
            <FaSearch className=" text-gray-400" />
            <input
                type="text"
                name="jobTitle"
                placeholder="Search jobs..."
                value={searchQuery.jobTitle}
                onChange={handleSearchChange}
                className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300"
            />
        </div>
        <div className="relative filter">
            <FaBriefcase className=" text-gray-400" />
            <input
                type="text"
                name="jobType"
                placeholder="Job Type"
                value={searchQuery.jobType}
                onChange={handleSearchChange}
                className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300"
            />
        </div>
        <div className="relative filter">
            <FaMapMarkerAlt className=" text-gray-400" />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={searchQuery.location}
                onChange={handleSearchChange}
                className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300"
            />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Search
        </button>
        <button type="button" onClick={handleResetFilters} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400">
            Reset Filters
        </button>
    </div>
</form>
      </div>


        <div className="mt-8">
          <div className="grid md:grid-cols-3 gap-x-14">
          <div className="md:col-span-1 row-start-3 md:row-start-auto h-fit md:sticky top-0">
            <div
              className={`filter-modal ${isFilterMenuOpen && "open"}`}
              onClick={handleCloseFiltermenu}
            >
              <div className={`filter-dialog ${isFilterMenuOpen && "open"}`}>
                <div className="flex-center-between border-b dark:border-slate-800 md:hidden">
                  <p className="uppercase">Filters</p>
                  <div
                    className="icon-box md:hidden"
                    onClick={() =>
                      dispatch({ type: actioTypes.closeFilterMenu })
                    }
                  >
                    <FiDelete />
                  </div>
                </div>
                <FilterSidebar
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 mt-5 md:mt-0 h-fit md:sticky top-0">
            <div className="mt-3">
            hhhhjknnnbbvvcc
            </div>

            <div className="flex-center-between mt-3">
              <div
                className="flex-align-center gap-4"
                onClick={() => dispatch({ type: actioTypes.openFilterMenu })}
              >
                <div className=" md:hidden icon-box bg-white dark:bg-dark-card card-shadow dark:shadow-none card-bordered !rounded-md">
                  <BiFilterAlt />
                </div>
                <h3 className="text-sm">
                  <span className="text-muted">Showing: </span>
                </h3>
              </div>
              <div className="flex-align-center gap-2">
                <p className="text-sm">Sort by:</p>
                <div className="flex-align-center gap-2">
                  <span className="text-sm text-primary">Posted Recently</span>
                  <FiChevronDown />
                </div>
              </div>
            </div>

            {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <JobListings jobs={jobs} />
                )}
          </div>
          </div>
    </div>
    </div>
    )
}

export default Test