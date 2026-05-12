import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import enquiryRouter from "./routes/enquiry.routes.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", enquiryRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
