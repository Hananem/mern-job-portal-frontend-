import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar"
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import Home from './pages/home/Home';
import AllJobs from './pages/jobs/AllJobs';
import Jobs from './pages/jobs/Jobs';
import JobDetails from './pages/jobs/JobDetails';
import Job from './pages/jobs/Job';
import PostJob from './pages/jobs/PostJob';
import CreateBlog from './pages/blog/CreateBlog';
import BlogList from './pages/blog/BlogList';
import BlogDetails from './pages/blog/BlogDetails';
import Blog from './pages/blog/Blog';
import CreateEvent from './pages/events/CreateEvent';
import EventList from './pages/events/EventList';
import Events from './pages/events/Events';
import CreateJobSeekerPost from './pages/jobSeeker/CreateJobSeekerPost';
import JobSeekerPostList from './pages/jobSeeker/JobSeekerPostList';
import AnotherJob from './pages/jobs/AnotherJob';
import JobSeekerPosts from './pages/jobSeeker/JobSeekerPosts';
import Profile from './pages/profile/Profile';
import Chat from './pages/chat/Chat';
import Notifications from './pages/notifications/Notifications';
import JobDetailsEditor from './pages/jobs/JobDetailsEditor';
import Test from './pages/jobs/Test';
import { useSelector } from 'react-redux';
function App() {
  return (
    <div className="App">
    <Navbar/>
     <Routes>
     <Route path="/" element={<Home />} /> 
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/jobs" element={<AllJobs />} />
     <Route path="/chat" element={<Chat />} />
     <Route path="/alljobs" element={<Jobs />} />
     <Route path="/jobs/:jobId" element={<AnotherJob />} />
     <Route  path="/notifications" element={<Notifications/>} />
     <Route  path="/test" element={<Test/>} />

     <Route path="/post-job" element={<PostJob />} />
     <Route path="/create-blog" element={<CreateBlog />} />
     <Route path="/create-event" element={<CreateEvent />} />
     <Route path="/create-jobseeker" element={<CreateJobSeekerPost />} />
     <Route path="/jobseeker" element={<JobSeekerPosts />} />
     <Route path="/jobseeker-list" element={<JobSeekerPostList />} />
     <Route path="/event-list" element={<EventList />} />
     <Route path="/events" element={<Events />} />
     <Route path="/blogs" element={<BlogList />} />
     <Route path="/blogs/:id" element={<Blog />} />
     <Route path="/profile/:userId"   element={<Profile />} />
     </Routes>
    </div>
  );
}

export default App;
