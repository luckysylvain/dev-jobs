import express, { Express } from "express";
import jobRouter from "./routes/job.route";
import cors from 'cors'



const app: Express = express();

const PORT: number = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/job", jobRouter);

app.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
