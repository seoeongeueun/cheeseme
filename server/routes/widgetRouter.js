import express from 'express';
import Widget from '../models/widgetModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const widgetRouter = express.Router();

widgetRouter.get('/', asyncHandler(async(req, res) => {
    const widget = await Widget.find({});
    res.send(widget)
}));

widgetRouter.get('/:name', asyncHandler(async(req, res) => {
    const widget = await Widget.findOne({name: req.params.name});
    res.send(widget);
}));

widgetRouter.post('/add', asyncHandler(async(req, res) => {
    const name = req.body.name;
    const imgUrl = req.body.imgUrl;
    const show = req.body.show;
    const round = req.body.round;
    await Widget.create({ name, imgUrl, show, round })
    res.send('Created')
}));

// positionRouter.delete("/delete/:date", asyncHandler(async(req, res) => {
//     await Dday.deleteOne({date: req.params.date});
//     res.send('Deleted');
// }));

widgetRouter.post('/update/:name', asyncHandler(async(req, res) => {
    await Position.findOneAndUpdate({ name: req.params.name } , {name: req.body.name, imgUrl: req.body.imgUrl, show: req.body.show, round: req.body.round});
    res.send('Updated')
}))


export default widgetRouter;