import express from 'express';
import Clock from '../models/clockModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const clockRouter = express.Router();

clockRouter.get('/getByOwner/:owner', asyncHandler(async(req, res) => {
    const clock = await Clock.findOne({ owner: req.params.owner });
    res.send(clock);
}));

clockRouter.post('/add/:owner', asyncHandler(async(req, res) => {
    const owner = req.params.owner;
    const show = req.params.show;
    await Clock.create({ owner, list })
    res.send('Created')
}));

clockRouter.delete("/delete/:owner", asyncHandler(async(req, res) => {
    await Clock.deleteOne({owner: req.params.owner});
    res.send('Deleted');
}));

clockRouter.post('/update/:owner', asyncHandler(async(req, res) => {
    const show = req.body.show;
    await Clock.updateOne({owner: req.params.owner}, {show: show});
    res.send('Updated')
}))

export default clockRouter;