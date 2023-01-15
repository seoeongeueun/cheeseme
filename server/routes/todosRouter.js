import express from 'express';
import Todos from '../models/todosModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const todosRouter = express.Router();

todosRouter.get('/', asyncHandler(async(req, res) => {
    const todos = await Todos.find({});
    res.send(todos);
}));

todosRouter.get('/:date', asyncHandler(async(req, res) => {
    const todo = await Todos.findOne({date: req.params.date});
    res.send(todo);
}));

todosRouter.post('/add', asyncHandler(async(req, res) => {
    const date = req.body.date;
    const goals = req.body.goals;
    await Todos.create({ date, goals })
    res.send('Created')
}));

todosRouter.delete("/delete/:date", asyncHandler(async(req, res) => {
    await Todos.deleteOne({date: req.params.date});
    res.send('Deleted');
}));

todosRouter.post('/update/:date', asyncHandler(async(req, res) => {
    await Todos.updateOne({date: req.params.date}, {goals: req.body.goals});
    res.send('Updated')
}))


export default todosRouter;