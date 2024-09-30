import prisma from "../../config/prisma";
import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";

export const getJobs: RequestHandler = expressAsyncHandler(
    async (req, res, next) => {
      const jobs = await prisma.job.findMany({
        select: {
          jobId: true,
          jobCreatedAt: true,
          jobTitle: true,
          jobLocation: true,
          company: {
            select: {
              companyId: true,
              companyLogo: true,
              companyName: true,
            },
          },
     },
     
    });
  res.status(200).json(jobs);
}
);
export const getOneJobDetails: RequestHandler = expressAsyncHandler(
    async (req, res, next) => {
        const jobId: string = req.params.jobId
    const job = await prisma.job.findUnique({
      select: {
        jobId: true,
        jobCreatedAt: true,
        jobTitle: true,
        jobLocation: true,
        jobDescription: true,
        jobRequirement: true,
        jobResponsibility: true,
        company: {
          select: {
            companyId: true,
            companyLogo: true,
            companyWebsite: true,
            companyName: true,
          },
        },
          },
          where: {
           jobId: jobId,
            },
  });
  
  res.status(200).json(job);
}
);
export const searchJobByTitle: RequestHandler = expressAsyncHandler(
    async (req, res, next) => {
    const job = await prisma.job.findMany({
          select: {
          jobId: true,
          jobCreatedAt: true,
          jobTitle: true,
          jobLocation: true,
          company: {
            select: {
              companyId: true,
              companyLogo: true,
              companyName: true,
            },
          },
     },
    where: {
      OR: [
        {
          jobTitle: {
            contains: req.params.searchValue,
            mode: "insensitive",
          },
            },
      ],
    },
  });
  res.status(200).json(job);
}
);
export const searchJobByLocation: RequestHandler = expressAsyncHandler(
    async (req, res, next) => {
    const job = await prisma.job.findMany({
          select: {
          jobId: true,
          jobCreatedAt: true,
          jobTitle: true,
          jobLocation: true,
          company: {
            select: {
              companyId: true,
              companyLogo: true,
              companyName: true,
            },
          },
     }, 
    where: {
      OR: [
        {
          jobLocation: {
            contains: req.params.searchValue,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  res.status(200).json(job);
}
);

