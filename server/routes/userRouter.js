import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const userRouter = express.Router();

userRouter.get('/', asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.send(users);
}));

userRouter.get('/:name', asyncHandler(async(req, res) => {
    const user = await User.findOne({name: req.params.name});
    res.send(user);
}));

userRouter.get('/search/:email', asyncHandler(async(req, res) => {
    const user = await User.findOne({ email : req.params.email });
    res.send(user)
}))

userRouter.post('/add', asyncHandler(async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const friends = req.body.friends;
    const isAdmin = false;
    await User.create({ name, email, password, friends, isAdmin })
    res.send('Created')
}));

userRouter.delete("/delete/:name", asyncHandler(async(req, res) => {
    await User.deleteOne({name: req.params.name});
    res.send('Deleted');
}));

userRouter.post('/update/:name', asyncHandler(async(req, res) => {
    await User.updateOne({name: req.params.name}, {email: req.body.email, password: req.body.password, friends: req.body.friends, isAdmin: isAdmin});
    res.send('Updated')
}))

export default userRouter;