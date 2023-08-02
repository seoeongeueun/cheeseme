import express from 'express';
import Todos from '../models/todosModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const todosRouter = express.Router();

todosRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const todos = await Todos.find({});
    res.send(todos);
  })
);

todosRouter.get(
  '/:date',
  asyncHandler(async (req, res) => {
    const todo = await Todos.findOne({ date: req.params.date });
    res.send(todo);
  })
);

todosRouter.get(
  '/getByOwner/:owner',
  asyncHandler(async (req, res) => {
    const todos = await Todos.find({ owner: req.params.owner });
    res.send(todos);
  })
);

todosRouter.get(
  '/search/goals/:keyword',
  asyncHandler(async (req, res) => {
    const todo = await Todos.find({
      'goals.text': { $regex: req.params.keyword, $options: 'i' },
    });
    res.send(todo);
  })
);

todosRouter.post(
  '/add',
  asyncHandler(async (req, res) => {
    const owner = req.body.owner;
    const date = req.body.date;
    const goals = req.body.goals;
    const smile = req.body.smile;
    await Todos.create({ owner, date, goals, smile });
    res.send('Created');
  })
);

todosRouter.delete(
  '/delete/:date',
  asyncHandler(async (req, res) => {
    await Todos.deleteOne({ date: req.params.date });
    res.send('Deleted');
  })
);

todosRouter.delete(
  '/deleteById/:_id',
  asyncHandler(async (req, res) => {
    await Todos.deleteOne({ _id: req.params._id });
    res.send('Deleted');
  })
);

todosRouter.post(
  '/update/:date',
  asyncHandler(async (req, res) => {
    await Todos.updateOne(
      { date: req.params.date },
      { goals: req.body.goals, smile: req.body.smile }
    );
    res.send('Updated');
  })
);

todosRouter.post(
  '/updateById/:_id',
  asyncHandler(async (req, res) => {
    await Todos.updateOne(
      { _id: req.params._id },
      { goals: req.body.goals, smile: req.body.smile }
    );
    res.send('Updated');
  })
);

export default todosRouter;
