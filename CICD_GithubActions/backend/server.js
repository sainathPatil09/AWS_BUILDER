import express from 'express'; 
import dotenv from 'dotenv';
// import connectDB from './db.js';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors())

const PORT = process.env.PORT || 4001; 

// connectDB()

app.get('/check', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})