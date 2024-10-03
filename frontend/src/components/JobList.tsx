import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleListJobs, setVisibleListJobs] = useState(6); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

 
  const getData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/job');
      if (!res.ok) {
          setError('Data recovery error');
          setIsLoading(false);
          return;
      }
      const data = await res.json();
          setJobs(data);
    } catch (error) {
      setError('Error loading data.');
    } 
    setIsLoading(false);
  };
useEffect(() => {
 getData();
}, []);
  const search = async () => {
    setIsLoading(true);
    setError(null);
    let url = 'http://localhost:5000/api/job';
    if (searchTitle) {
      url = `http://localhost:5000/api/job/search/title/${searchTitle}`;
    } else if (searchLocation) {
      url = `http://localhost:5000/api/job/search/location/${searchLocation}`;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) {
          setError('Data recovery error');
          setIsLoading(false);
          return;
      }
      const data = await res.json();
      setJobs(data);
       setIsModalOpen(false);
    } catch (error) {
       setError('Error loading data.');
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (searchTitle === '') {
      getData();
    }
  }, [searchTitle]);
  useEffect(() => {
    if (searchLocation === '') {
      getData();
    }
  }, [searchLocation]);

  const jobTitle = (jobId: string) => {
           navigate(`/${jobId}`);
  };
  const toogleModal = () => {
   setIsModalOpen(!isModalOpen)
 }
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="bg-blue-500 h-28 rounded-s-full rounded-tl-none">
        <div className='flex items-center justify-between p-8 pl-[84px] pr-[84px]'>
          <div className='text-white font-bold'>
           devjobs
          </div>
          <div>
               <p className='w-8 h-4 bg-slate-300 rounded-full'></p>
          </div>
        </div>
      </header>
      <div>
                <div className="hidden md:flex space-x-1 mb-4 items-center justify-center -mt-10  bg-white m-20 rounded-md h-20">
              <div className='w-[410px] h-14'>
                  <div className='pl-4 pr-4 pt-2'>
                      <input
                        type="text"
                        placeholder="Filter by title..."
                        className="p-2 outline-none text-black w-full cursor-pointer"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    </div>
                </div>
              <div className='w-[410px] h-14'>
                  <div className='pl-4 pr-4 pt-2'>
                  <input
                    type="text"
                    placeholder="Filter by location..."
                    className="p-2 outline-none text-black  w-full cursor-pointer"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                      />
                      </div>
          </div>
              <div className='w-[410px] h-14'>
                  <div className='flex items-center justify-between pl-4 pr-4 pt-2'>
                      <div className='hidden  md:flex items-center justify-center space-x-2'>
                <p className='w-6 h-6 '>
                  <input
                      type="checkbox"
                      className="h-6 w-6 cursor-pointer"
                  />
                </p>
                <p>Full Time</p>
              </div>
              <div>
                <button onClick={search} className="bg-blue-500 text-white p-2 rounded-lg w-28 h-10 cursor-pointer">
                    Search
                </button>
                  </div>
                  </div>
          </div>
        </div>
    
             <div className="md:hidden flex items-center justify-between p-2 -mt-10  bg-white m-10 rounded-md h-20">
              <div className='w-[400px] h-14'>
                  <div className='pr-4 pt-2'>
                      <input
                        type="text"
                        placeholder="Filter by title..."
                        className="p-2 outline-none text-black w-full"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <div>
                      <div className=" bg-slate-700 p-3 rounded-lg w-14 h-14" onClick={toogleModal}>
                     <img src='location.jpg' alt='location' className='w-8 h-8'/>
                       </div>
                 </div>
                  <div>
                    <button onClick={search} className="bg-blue-500 text-white p-2 rounded-lg w-14 h-14">
                    <img src='recherche.png' alt='recherche'/>
                   </button>
                 </div>
                 </div>
      </div>
          
        <div className='flex items-center justify-center mt-20 mb-8'>
          {isLoading ? (
            <div>Loading data...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-16 text-black ">
          {jobs.map((job: any, index: number) => (
          index < visibleListJobs && <JobCard key={job.jobId} job={job} clickJobTitle={jobTitle} />
        ))}
            </div>
           )}
      </div>
            </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 md:hidden">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
            <div className="flex items-center space-x-2 mb-4 border-b-2 p-4 border-black ">
              <img src='location.jpg' alt='location' className='w-8 h-8'/>
              <input
                type="text"
                placeholder="Filter by location..."
                className="p-2 w-full text-black rounded-lg outline-none"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className=" h-4 w-4"
              />
              <span className="ml-2 text-black">Full Time</span>
            </div>

            <button
              onClick={() => {
                search();
              }}
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Search
            </button>
          </div>
        </div>
      )}
{visibleListJobs < jobs.length && (
  <div className='flex items-center justify-center text-white mb-8'>
    <button 
      className='w-32 h-10 bg-blue-700 rounded-md' 
      onClick={() => setVisibleListJobs(jobs.length)}
    >
      Load More
    </button>
  </div>
)}
    </div>
  );
};

export default JobList;