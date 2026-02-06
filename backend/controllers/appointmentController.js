const { Appointment, Schedule, Notification, User } = require("../models");
const { sendEmail } = require("../services/mailer");

const createAppointment = async (req, res) => {
    try {
        const { userId, scheduleId, serviceId } = req.body;
        
        const schedule = await Schedule.findByPk(scheduleId);
        if (!schedule || !schedule.isAvailable) {
            return res.status(400).json({ success: false, error: "Termin nije dostupan" });
        }

        schedule.isAvailable = false;
        await schedule.save();

        const appointment = await Appointment.create({ 
            userId, 
            scheduleId, 
            serviceId, 
            status: "PENDING" 
        });

        await Notification.create({ 
            userId, 
            type: "appointment", 
            message: "Rezervacija kreirana", 
            sentAt: new Date() 
        });

        if (req.user && req.user.email) {
            try {
                await sendEmail(req.user.email, "Rezervacija kreirana", "Vaša rezervacija je uspešno kreirana!");
            } catch (mailErr) {
                console.error("Email nije poslat, ali rezervacija je sačuvana:", mailErr.message);
            }
        }

        res.json({ success: true, data: appointment });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


module.exports = {
    createAppointment
};