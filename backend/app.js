const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const app = express();
app.use(helmet());
const allowedOrigins = [
  'https://frontend-production-65af.up.railway.app', 
  'http://localhost:5173',                        
  'http://localhost:3000'                         
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
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