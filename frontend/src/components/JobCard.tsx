import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

interface JobCardProps {
  job: {
    jobId: string;
    jobTitle: string;
    jobLocation: string;
    company: {
      companyLogo: string;
      companyName: string;
    };
    jobCreatedAt: string;
    jobTime: string;
    };
     clickJobTitle: (jobId: string) => void;
}

TimeAgo.addDefaultLocale(en);
const JobCard = ({ job, clickJobTitle }: JobCardProps) => {
    const timeAgo = new TimeAgo('en-US');
  return (
    <div className="bg-white shadow-md p-4 rounded-lg w-[350px]">
      <div className="flex items-center justify-between -mt-10">
        <img src={`/public/${job.company.companyLogo}`} alt="companyLogo" className="w-12 h-12 bg-slate-300 p-2 rounded-md" />
          </div>
      <div className="text-slate-500 text-xs mt-4 flex items-center">
        <span>
          {timeAgo.format(new Date(job.jobCreatedAt))}
        </span>
        <div className="mx-2 font-extrabold text-2xl rounded-full w-1 h-1 bg-slate-500"></div>
          <span>{job.jobTime}</span>
        </div>
          <h3 
             onClick={() => clickJobTitle(job.jobId)}  className="text-sm font-bold cursor-pointer mt-2">{job.jobTitle}</h3>
      <p className="text-gray-500 text-xs mt-2">{job.company.companyName}</p>
      <p className="text-blue-500 font-bold text-xs mt-8">{job.jobLocation}</p>
    </div>
  );
};

export default JobCard;