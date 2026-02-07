const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models"); // Pretpostavka: sequelize index.js izvozi User
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "tajni_kljuc";

const register = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        
        // Hesiranje lozinke
        const hashedPassword = bcrypt.hashSync(password, 8);
        
        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword, 
            role, 
            phone 
        });
        
        const userResponse = user.toJSON();
        delete userResponse.password;
        
        res.json({ success: true, data: userResponse });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(400).json({ success: false, error: "Korisnik ne postoji" });
        }
        
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.status(400).json({ success: false, error: "Pogrešna lozinka" });
        }
        
        // Generisanje JWT tokena
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            SECRET_KEY, 
            { expiresIn: "1h" }
        );
        
        const userData = user.get({ plain: true });
        delete userData.password;

        res.json({ success: true, data: { token, user: userData } }); 
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Logout na backendu obično samo šalje uspeh, jer klijent briše token
const logout = async (req, res) => {
    res.json({ success: true, message: "Uspešno ste se odjavili" });
};

module.exports = {
    register,
    login,
    logout
};