import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobList from './components/JobList';
import JobDetails from "./components/JobDetails";

const App = () => {
  return <div>
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/:jobId" element={<JobDetails/>} />
      </Routes>
    </Router>
  </div>;
};

export default App;
