import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db')
}).catch( err => {
    console.log(err.message);
});

const app = express();

app.get('/api/products', (req, res) => {
    res.send()
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
});