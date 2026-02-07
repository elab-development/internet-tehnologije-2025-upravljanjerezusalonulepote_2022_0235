const { Service } = require("../models"); 

const getServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json({ success: true, data: services });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

const updateService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ success: false, error: "Usluga ne postoji" });
        await service.update(req.body);
        res.json({ success: true, data: service });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ success: false, error: "Usluga ne postoji" });
        await service.destroy();
        res.json({ success: true, message: "Usluga je uspešno obrisana" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = { 
    getServices, 
    createService, 
    updateService, 
    deleteService 
};