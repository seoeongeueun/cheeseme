import express from 'express';
import Dday from '../models/ddayModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const ddayRouter = express.Router();

ddayRouter.get('/', asyncHandler(async(req, res) => {
    const dday = await Dday.find({});
    res.send(dday);
}));

ddayRouter.get('/:date', asyncHandler(async(req, res) => {
    const dday = await Dday.findOne({date: req.params.date});
    res.send(dday);
}));

ddayRouter.post('/add', asyncHandler(async(req, res) => {
    const date = req.body.date;
    const text = req.body.text;
    const end = req.body.end;
    const start = req.body.start;
    await Dday.create({ date, text, start, end })
    res.send('Created')
}));

ddayRouter.delete("/delete/:date", asyncHandler(async(req, res) => {
    await Dday.deleteOne({date: req.params.date});
    res.send('Deleted');
}));

ddayRouter.post('/update/:date', asyncHandler(async(req, res) => {
    const text = req.body.text;
    const start = req.body.start;
    const end = req.body.end;
    await Dday.updateOne({date: req.params.date}, {text: text, start: start, end: end});
    res.send('Updated')
}))


export default ddayRouter;