import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

const userRouter = express.Router();

userRouter.get('/', asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.send(users);
}));

userRouter.get('/find/:userId', asyncHandler(async(req, res) => {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.params.userId)});
    res.send(user);
}));

userRouter.get('/:name', asyncHandler(async(req, res) => {
    const user = await User.findOne({name: req.params.name});
    res.send(user);
}));


userRouter.get('/info/:userId', asyncHandler(async(req, res) => {
    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)});
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
    const positions = req.body.positions;
    const settings = req.body.settings;
    const notifications = req.body.notifications;
    const stickers = req.body.stickers;
    await User.create({ name, email, password, friends, isAdmin, positions, settings, notifications, stickers })
    res.send('Created')
}));

userRouter.delete("/delete/:name", asyncHandler(async(req, res) => {
    await User.deleteOne({name: req.params.name});
    res.send('Deleted');
}));

userRouter.post('/update/:userId', asyncHandler(async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const friends = req.body.friends;
    const isAdmin = false;
    const positions = req.body.positions;
    const settings = req.body.settings;
    const notifications = req.body.notifications;
    const stickers = req.body.stickers;
    await User.updateOne({_id: mongoose.Types.ObjectId(req.params.userId)},
    {email: email, password: password, friends: friends, isAdmin: isAdmin, positions: positions, settings: settings, notifications: notifications, stickers: stickers});
    res.send('Updated')
}))


userRouter.post('/updateWithName/:name', asyncHandler(async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const friends = req.body.friends;
    const isAdmin = false;
    const positions = req.body.positions;
    const settings = req.body.settings;
    const notifications = req.body.notifications;
    const stickers = req.body.stickers;
    await User.updateOne({name: req.params.name}, 
    {email: email, password: password, friends: friends, isAdmin: isAdmin, positions: positions, settings: settings, notifications: notifications, stickers: stickers});
    res.send('Updated')
}))

let auth = async(req, res, next) => {
    let token = req.cookies.x_auth;
    await User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true, token });
        req.token = token;
        req.user = user;
        next();
    })
}

// userRouter.post('/login', asyncHandler(async(req, res) => {
//     const user = await User.findOne({ name: req.body.name });
//     if (!user) return res.json({ loginSuccess: false, message: "No user found with username " + req.body.name });

//     user.comparePassword("testing", (err, isMatch) => {
//         if (!isMatch) return res.json({ loginSuccess: false, message: "Incorrect Password"});

//         user.generateToken((err, user) => {
//             if (err) return res.status(400).send(err);

//             res.cookie("x_auth", user.token)
//                 .status(200)
//                 .json({ loginSuccess: true, userId: user._id });
//         })  
//     })
// }))

userRouter.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.isAdmin,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
    })
})

export default userRouter;
export { auth };