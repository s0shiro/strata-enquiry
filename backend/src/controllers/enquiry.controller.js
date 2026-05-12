import { validateEnquiryInput } from "../validators/enquiry.validator.js";
import { analyseEnquiry } from "../services/enquiry.service.js";

export async function analyseEnquiryController(req, res, next) {
  try {
    const enquiry = validateEnquiryInput(req.body?.enquiry);
    const result = await analyseEnquiry(enquiry);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}
