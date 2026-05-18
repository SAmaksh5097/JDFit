import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import db from './config/db.js';
const app = express();

// Middleware

app.use(cors(
    {
        origin: 'http://localhost:5173', // Adjust this to your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

// Connect to the database globally and listen
db.connect()
    .then(() => {
        console.log('JDFit database connected successfully.');
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
    });

app.get('/', (req,res)=>{
    res.send("BACKEND SERVER FOR JDFit")
})

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/resume', resumeRoutes);