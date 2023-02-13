import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import notesRouter from './routes/notesRouter.js';
import todosRouter from './routes/todosRouter.js';
import ddayRouter from './routes/ddayRouter.js';
import positionRouter from './routes/positionRouter.js';
import widgetRouter from './routes/widgetRouter.js';
import rightRouter from './routes/rightRouter.js'
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import asyncHandler from './utils/asyncHandler.js';
import User from './models/userModel.js';
import cookieParser from 'cookie-parser';
import { auth } from './routes/userRouter.js';


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

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/seed', seedRouter);
app.use('/api/notes', notesRouter);
app.use('/api/todos', todosRouter);
app.use('/api/dday', ddayRouter);
app.use('/api/position', positionRouter);
app.use('/api/widget', widgetRouter);
app.use('/api/right', rightRouter);
app.use('/api/users', userRouter);

app.get('/logout', auth, (req, res) => {
    //미들웨어에서 가져옴
    User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.user._id) },
        { token: '' },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            else return res.status(200).send({
                success: true
            })
        }
    )
})

app.post('/login', asyncHandler(async(req, res) => {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.json({ loginSuccess: false, message: "No user found with username " + req.body.name });

    user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) return res.json({ loginSuccess: false, message: "Incorrect Password"});

        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id });
        })  
    })
}))

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
});