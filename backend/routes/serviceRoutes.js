const express = require("express");
const { 
    getServices, 
    createService, 
    updateService, 
    deleteService 
} = require("../controllers/serviceController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", getServices);

router.use(protect); 
router.use(authorize("ADMIN"));

router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;