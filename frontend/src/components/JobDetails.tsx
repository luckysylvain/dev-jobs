import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeAgo = new TimeAgo('en-US');
    
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
        try {
          const res = await fetch(`http://localhost:5000/api/job/${jobId}`);
          if (!res.ok) {
          setError('Data recovery error');
          setIsLoading(false);
          return;
        }
      const data = await res.json();
        setJob(data);
        setError(null);
      } catch (error) {
        setError('Error loading data.');
      } 
       setIsLoading(false);
    };
    getData();
      
  }, [jobId]);

   if (isLoading) return <div className='flex items-center justify-center mt-40'>Loading data...</div>;
   if (error) return <div className='flex items-center justify-center text-red-500 mt-40'>{error}</div>;
   if (!job) return <div className='flex items-center justify-center mt-40'>No data available</div>;
  return (
     <div className="min-h-screen flex flex-col bg-slate-100">
          <header className="bg-blue-500 md:h-28 h-52 md:rounded-s-full md:rounded-tl-none">
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
        <div className="flex space-x-1 mb-4 items-center md:justify-between flex-col md:flex-row -mt-10 rounded-md md:h-20 h-72 pr-8 bg-white mx-4 md:mx-auto md:w-[50%]">
          <div className="flex items-center md:justify-center flex-col md:flex-row space-x-6 h-full space-y-6 md:space-y-0">
            <div className="bg-slate-300 flex items-center md:h-full h-20 rounded-xl -mt-9 md:-mt-0">
              <img
                src={`/public/${job.company.companyLogo}`}
                alt="companyLogo"
                className="md:w-full md:h-full w-20 h-20 bg-slate-300 p-2 md:rounded-s-md  rounded-xl md:rounded-none"
              />
            </div>
            <div>
              <p className="text-gray-800 font-bold text-sm">{job.company.companyName}</p>
              <p className="text-gray-300 text-xs mt-4 md:mt-0">{job.company.companyWebsite}</p>
            </div>
          </div>
          <button className="bg-slate-300 text-blue-800 text-xs rounded-md w-28 h-10 -mt-28 md:mt-0">
            Company site
          </button>
        </div>

        <div className="bg-white rounded-lg mx-4 md:mx-auto md:mt-10 p-6 md:p-8 md:w-[50%] shadow-md mb-8">
           <div className='flex  md:justify-between flex-col md:flex-row'>
                      <div>
                    <div className="text-gray-500 text-sm flex items-center">
                     <span>
                          {timeAgo.format(new Date(job.jobCreatedAt))}
                     </span>
                    <div className="mx-2 font-extrabold text-2xl rounded-full w-1 h-1 bg-slate-500"></div>
                     <span className='text-slate-500'>{job.jobTime}</span>
                    </div>
                            <h2 className="text-2xl md:text-sm max-w-xs font-semibold text-black mt-5 md:mt-2">{job.jobTitle}</h2>
                            <p className="text-blue-500 font-bold text-xs mt-3 md:mt-2">{job.jobLocation}</p>
                      </div>
                      <div>
                          <button className='bg-blue-700 w-28 h-10 rounded-md text-xs text-white mt-10 md:mt-0'>
                              Apply Now
                          </button>
                      </div>
          </div>
          <p className="text-gray-800 text-xs break-words max-w-md md:max-w-2xl mt-6">{job.jobDescription}</p>
          <h3 className="text-xs mt-4 text-black font-bold">Requirements</h3>
          <p className="text-gray-800 text-xs break-words max-w-md md:max-w-2xl mt-4">{job.jobRequirement}</p>

          <h3 className="text-xs mt-4 text-black font-bold">What You Will Do</h3>
          <p className="text-gray-800 text-xs break-words max-w-md md:max-w-2xl mt-6">{job.jobResponsibility}</p>
        </div>
      </div>
      <footer className="bg-white text-white py-4 text-center mt-auto w-full">
        <div className='md:w-[50%] h-14 mx-4 md:mx-auto'>
                  <div className='flex items-center justify-between'>
                      <div className=''>
                          <p className='text-black font-bold md:text-sm text-xs'>
                              {job.jobTitle}
                          </p>
                          <p className='text-xs text-slate-400'>
                             {job.company.companyName} 
                          </p>
                      </div> 
                       <div>
                          <button className='bg-blue-700 w-28 h-10 rounded-md text-xs text-white'>
                              Apply Now
                      </button>
                      </div>
                  </div>
        </div>
      </footer>
    </div>
  );
};

export default JobDetails;