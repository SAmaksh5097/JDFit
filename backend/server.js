import express from 'express';
const app = express();
import db from './config/db.js';


const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.get('/', (req,res)=>{
    res.send("BACKEND SERVER FOR JDFit")
})