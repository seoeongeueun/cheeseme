import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import notesRouter from './routes/notesRouter.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;
const ORIGIN = process.env.ORIGIN ? process.env.ORIGIN : "127.0.0.1:3000";

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db')
}).catch( err => {
    console.log(err.message);
});

app.use('/api/seed', seedRouter);
app.use('/api/notes', notesRouter);

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
});