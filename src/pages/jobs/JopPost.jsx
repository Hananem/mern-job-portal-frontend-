import React from 'react';

const JobPost= ({ jobPosts }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
            {jobPosts.length > 0 ? (
                <ul>
                    {jobPosts.map((job, index) => (
                        <li key={index} className="mb-8 flex items-center">
                            <a href={job.logoLink} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mr-4">
                                <img src={job.logo} alt={job.company} className="h-16 w-16 rounded-full" />
                            </a>
                            <div>
                                <h3 className="text-lg font-semibold">{job.company}</h3>
                                <p className="text-gray-600 mb-2">{job.description}</p>
                                <p className="text-gray-600">Salary Range: {job.salaryRange}</p>
                                <button className="bg-blue-500 text-white px-4 py-2 mt-2">Apply Now</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No jobs found</p>
            )}
        </div>
    );
};

export default JobPost;
