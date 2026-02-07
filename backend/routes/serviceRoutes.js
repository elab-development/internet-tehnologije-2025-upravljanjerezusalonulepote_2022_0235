const express = require("express");
const { 
    getServices, 
    createService, 
    updateService, 
    deleteService 
} = require("../controllers/serviceController");

const { protect, authorize } = require("../middleware/authMiddleware");

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getServices);

router.use(protect);
router.use(authorize("ADMIN"));

router.post("/", createService);

router.put("/:id", updateService);

router.delete("/:id", deleteService);

export default router;