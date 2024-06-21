import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controller/JobController.js";
import {
  validateJobInput,
  validateIdParm,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// router.get('/', getAllJobs);
// router.post('/', createJob);

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(validateIdParm, getJob)
  .patch(checkForTestUser, validateIdParm, validateJobInput, updateJob)
  .delete(checkForTestUser, validateIdParm, deleteJob);

export default router;
