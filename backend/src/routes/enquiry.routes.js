import { Router } from "express";
import { analyseEnquiryController } from "../controllers/enquiry.controller.js";

const enquiryRouter = Router();

enquiryRouter.post("/analyse-enquiry", analyseEnquiryController);

export default enquiryRouter;
