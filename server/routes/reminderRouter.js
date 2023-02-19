import express from 'express';
import Reminder from '../models/reminderModel.js'
import asyncHandler from '../utils/asyncHandler.js';

const reminderRouter = express.Router();

reminderRouter.get('/', asyncHandler(async(req, res) => {
    const reminders = await Reminder.find({});
    res.send(reminders)
}));

reminderRouter.get('/:owner', asyncHandler(async(req, res) => {
    const reminders = await Reminder.findOne({ ownder: req.params.owner });
    res.send(reminders);
}));


reminderRouter.get('/search/title/:keyword', asyncHandler(async(req, res) => {
    const reminder = await Reminder.find({ "reminders.title" : {$regex : req.params.keyword, '$options' : 'i'}});
    res.send(reminder)
}));

reminderRouter.get('/search/detail/:keyword', asyncHandler(async(req, res) => {
    const reminder = await Reminder.find({ "reminders.detail" : {$regex : req.params.keyword, '$options' : 'i'}});
    res.send(reminder)
}));

reminderRouter.post('/add', asyncHandler(async(req, res) => {
    const owner = req.body.owner;
    const reminders = req.body.reminders;
    await Reminder.create({ owner, reminders })
    res.send('created')
}));

reminderRouter.delete('/delete/:owner', asyncHandler(async(req, res) => {
    await Reminder.deleteOne({ owner: req.params.owner });
    res.send('Deleted');
}))

reminderRouter.post('/update/:owner', asyncHandler(async(req, res) => {
    await Reminder.updateOne({ owner: req.params.owner }, { reminders: req.body.reminders });
    res.send('Updated');
}))

export default reminderRouter;