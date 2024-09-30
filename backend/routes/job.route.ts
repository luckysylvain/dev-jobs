import { Router } from "express";
import {
    getJobs,
    getOneJobDetails,
    searchJobByTitle,
    searchJobByLocation
 } from "../controllers/job.controller";

const jobRouter = Router();
jobRouter.route("/").get(getJobs);
jobRouter.route("/:jobId").get(getOneJobDetails);
jobRouter.route("/search/title/:searchValue").get(searchJobByTitle);
jobRouter.route("/search/location/:searchValue").get(searchJobByLocation);

export default jobRouter;