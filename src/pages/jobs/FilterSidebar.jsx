import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const FilterSidebar = ({ onApplyFilters, onResetFilters }) => {
    const [filters, setFilters] = useState({
        experienceLevel: [],
        employmentType: [],
        minSalary: '',
        maxSalary: ''
    });

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        if (checked) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: [...prevFilters[name], value]
            }));
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: prevFilters[name].filter((item) => item !== value)
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleApplyFilters = () => {
        onApplyFilters(filters);
    };

    const handleResetFilters = () => {
        setFilters({
            experienceLevel: [],
            employmentType: [],
            minSalary: '',
            maxSalary: ''
        });
        onResetFilters();
    };

    return (
        <div className="p-4 text-black">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filter Jobs</h2>
             
            </div>
            <div className="mb-4 h-full overflow-y-auto max-h-[calc(100vh-120px)]">
                <div className="mb-4">
                    <label className="block mb-1 text-lg font-semibold capitalize">Experience Level</label>
                    <div>
                        {['Entry Level', 'Junior', 'Associate', 'Mid Level', 'Experienced', 'Senior', 'Lead', 'Manager', 'Director', 'Principal', 'Executive'].map((level) => (
                            <div key={level} className="mb-1">
                                <input
                                    type="checkbox"
                                    name="experienceLevel"
                                    value={level}
                                    checked={filters.experienceLevel.includes(level)}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                {level}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-lg font-semibold capitalize">Employment Type</label>
                    <div>
                        {['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Freelance', 'Seasonal', 'Remote', 'On-site', 'Hybrid', 'Permanent', 'Consultant', 'Project-based', 'Volunteer'].map((type) => (
                            <div key={type} className="mb-1 input-check">
  <input
    type="checkbox"
    id={`checkbox-${type}`}  // Unique id for each checkbox
    name="employmentType"
    value={type}
    checked={filters.employmentType.includes(type)}
    onChange={handleCheckboxChange}
    className="mr-2"
  />
  <label htmlFor={`checkbox-${type}`}>{type}</label>  
</div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Min Salary</label>
                    <input
                        type="number"
                        name="minSalary"
                        value={filters.minSalary}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Max Salary</label>
                    <input
                        type="number"
                        name="maxSalary"
                        value={filters.maxSalary}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handleApplyFilters}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={handleResetFilters}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;



