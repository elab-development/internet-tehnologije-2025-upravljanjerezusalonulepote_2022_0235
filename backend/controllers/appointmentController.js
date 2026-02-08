const { Appointment, Schedule, Notification, User, Service } = require("../models");
const { sendEmail } = require("../services/mailer");
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [
                { 
                    model: User, 
                    as: 'client', 
                    attributes: ['name', 'email'] 
                },
                { 
                    model: Service, 
                    as: 'service', 
                    attributes: ['name', 'price'] 
                },
                { 
                    model: Schedule, 
                    as: 'schedule',
                    attributes: ['date', 'startTime'] 
                }
            ],
            order: [['createdAt', 'DESC']] 
        });
        
        res.json({ success: true, data: appointments });
    } catch (err) {
        console.error("Greška u getAppointments:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};
 
const getDayName = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(dateString);
    return days[d.getDay()];
};


const createAppointment = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { scheduleId, serviceId } = req.body;

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
        console.error("Greška na backendu:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Termin nije pronađen" });
        }

        await appointment.update(req.body);
        res.json({ success: true, data: appointment });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Appointment.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Termin nije pronađen" });
        }

        res.json({ success: true, message: "Termin uspešno obrisan" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getSchedules = async (req, res) => {
    try {
        const { date } = req.query; 

        if (!date) {
            return res.status(400).json({ success: false, message: "Datum nije prosleđen" });
        }

        const freeSlots = await Schedule.findAll({
            where: { 
                date: date,
                isAvailable: true 
            },
            order: [['startTime', 'ASC']] 
        });

        console.log(`Pronađeno ${freeSlots.length} termina za datum: ${date}`);
        
        res.json({ success: true, data: freeSlots });
    } catch (err) {
        console.error("Greška u getSchedules:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const approveAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 

        const appointment = await Appointment.findByPk(id, {
            include: [{ model: User, as: 'client' }] 
        });

        if (!appointment) {
            return res.status(404).json({ success: false, error: "Rezervacija nije pronađena" });
        }

        appointment.status = status;
        await appointment.save();

        if (status === "REJECTED") {
            const schedule = await Schedule.findByPk(appointment.scheduleId);
            if (schedule) {
                schedule.isAvailable = true;
                await schedule.save();
            }
        }

        try {
            const message = status === "CONFIRMED" 
                ? "Vaša rezervacija je potvrđena!" 
                : "Nažalost, vaša rezervacija je odbijena. Molimo vas odaberite drugi termin.";
            
            await sendEmail(appointment.client.email, "Status vaše rezervacije", message);
        } catch (mailErr) {
            console.error("Email nije poslat:", mailErr.message);
        }

        res.json({ success: true, message: `Rezervacija je ${status.toLowerCase()}` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { 
    getAppointments, 
    createAppointment, 
    updateAppointment, 
    deleteAppointment, 
    getSchedules,
    approveAppointment
};