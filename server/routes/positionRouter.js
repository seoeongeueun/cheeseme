import express from 'express';
import Position from '../models/positionModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const positionRouter = express.Router();

positionRouter.get('/', asyncHandler(async(req, res) => {
    const position = await Position.find({});
    res.send(position);
}));

positionRouter.get('/:id', asyncHandler(async(req, res) => {
    const position = await Position.findById(req.params.id);
    res.send(position);
}));

positionRouter.post('/add', asyncHandler(async(req, res) => {
    const _id = "default";
    const cal = req.body.cal;
    const todo = req.body.todo;
    const note = req.body.note;
    const dday = req.body.dday;
    await Position.create({ _id, cal, todo, note, dday })
    res.send('Created')
}));

// positionRouter.delete("/delete/:date", asyncHandler(async(req, res) => {
//     await Dday.deleteOne({date: req.params.date});
//     res.send('Deleted');
// }));

positionRouter.post('/update/:id', asyncHandler(async(req, res) => {
    const cal = req.body.cal;
    const todo = req.body.todo;
    const note = req.body.note;
    const dday = req.body.dday;
    await Position.findByIdAndUpdate(req.params.id , {cal: cal, todo: todo, note: note, dday: dday});
    res.send('Updated')
}))


export default positionRouter;