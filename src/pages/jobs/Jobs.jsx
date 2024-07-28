import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import axios from 'axios';
import FilterSidebar from './FilterSidebar';
import JobListings from './JobListings';

const Jobs = () => {
    const [isOpen, setIsOpen] = useState(true);
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

    // Function to toggle the sidebar visibility
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="relative">
            <div className={`fixed top-0 left-0 w-64 h-screen  z-50 transition duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <FilterSidebar
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                    toggleSidebar={toggleSidebar}
                />
            </div>
            <div className="flex-1 lg:pl-72">
       <form onSubmit={handleSearchSubmit} className="mb-4">
    <div className="flex items-center mb-2 space-x-2">
        <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
                type="text"
                name="jobTitle"
                placeholder="Search jobs..."
                value={searchQuery.jobTitle}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-green-400 rounded-md focus:border-green-500 focus:ring-green-500"
            />
        </div>
        <div className="relative flex-1">
            <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
            <input
                type="text"
                name="jobType"
                placeholder="Job Type"
                value={searchQuery.jobType}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-green-400 rounded-md focus:border-green-500 focus:ring-green-500"
            />
        </div>
        <div className="relative flex-1">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={searchQuery.location}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-green-400 rounded-md focus:border-green-500 focus:ring-green-500"
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

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <JobListings jobs={jobs} />
                )}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-300 px-4 py-2 rounded-l-md"
                    >
                        Previous
                    </button>
                    <span className="bg-gray-200 px-4 py-2">{currentPage}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 px-4 py-2 rounded-r-md"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Jobs;

