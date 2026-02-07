const express = require("express");
const { 
    getAppointments, 
    createAppointment, 
    updateAppointment, 
    deleteAppointment,
    getSchedules 
} = require("../controllers/appointmentController");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/schedules", getSchedules);

router.use(protect);

router.get("/", getAppointments); 

router.post("/", authorize("CLIENT", "ADMIN"), createAppointment);

router.put("/:id", authorize("CLIENT", "MAKEUP_ARTIST", "ADMIN"), updateAppointment);

router.delete("/:id", authorize("CLIENT", "MAKEUP_ARTIST", "ADMIN"), deleteAppointment);

module.exports = router;