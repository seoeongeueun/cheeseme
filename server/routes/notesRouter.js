import express from 'express';
import Notes from '../models/notesModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const notesRouter = express.Router();

notesRouter.get('/', asyncHandler(async(req, res) => {
    const notes = await Notes.find({});
    res.send(notes);
}));

notesRouter.get('/:date', asyncHandler(async(req, res) => {
    const note = await Notes.findOne({date: req.params.date});
    res.send(note);
}));

notesRouter.get('getByOwner/:owner', asyncHandler(async(req, res) => {
    const note = await Notes.find({owner: req.params.owner});
    res.send(note);
}));

notesRouter.get('/search/text/:keyword', asyncHandler(async(req, res) => {
    const note = await Notes.find({text : {$regex : req.params.keyword, '$options' : 'i'}});
    res.send(note);
}));

notesRouter.post('/add', asyncHandler(async(req, res) => {
    const owner = req.body.owner;
    const date = req.body.date;
    const text = req.body.text;
    await Notes.create({ owner, date, text })
    res.send('Created')
}));

notesRouter.delete("/delete/:date", asyncHandler(async(req, res) => {
    await Notes.deleteOne({date: req.params.date});
    res.send('Deleted');
}));

notesRouter.post('/update/:date', asyncHandler(async(req, res) => {
    const text = req.body.text;
    await Notes.updateOne({date: req.params.date}, {text: text});
    res.send('Updated')
}))

notesRouter.post('/updateById/:_id', asyncHandler(async(req, res) => {
    const text = req.body.text;
    await Notes.updateOne({_id: req.params._id}, {text: text});
    res.send('Updated')
}))


export default notesRouter;