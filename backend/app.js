const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Previše zahteva, pokušajte ponovo kasnije."
});

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/api/", limiter); 
app.use("/api/auth", authRoutes);          
app.use("/api/services", serviceRoutes);  
app.use("/api/appointments", appointmentRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ 
        success: false, 
        error: err.message || "Server error" 
    });
});

module.exports = app; 