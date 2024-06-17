import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controller/JobController.js";
import {
  validateJobInput,
  validateIdParm,
} from "../middleware/validationMiddleware.js";

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParm, getJob)
  .patch(validateIdParm, validateJobInput, updateJob)
  .delete(validateIdParm, deleteJob);

export default router;
