import express, { Express } from "express";
import jobRouter from "./routes/job.route";


const app: Express = express();

const PORT: number = 5000;

app.use(express.json());

app.use("/api/job", jobRouter);

app.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
