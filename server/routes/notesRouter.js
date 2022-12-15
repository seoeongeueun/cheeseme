import express from 'express';
import Notes from '../models/notesModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const notesRouter = express.Router();

notesRouter.get('/', asyncHandler(async(req, res) => {
    const notes = await Notes.find({});
    res.send(notes);
}));

notesRouter.get('/:id', asyncHandler(async(req, res) => {
    const note = await Notes.findOne({id: req.params.id});
    res.send(note);
}));

notesRouter.post('/add', asyncHandler(async(req, res) => {
    const date = req.body.date;
    const text = req.body.text;

    await Notes.create({ date, text })
    res.send('Created')
}));

notesRouter.delete("/delete/:id", asyncHandler(async(req, res) => {
    await Notes.findByIdAndDelete(req.params.id)
    res.send('Deleted')
}));

notesRouter.post('/update/:id', asyncHandler(async(req, res) => {
    const text = req.body.text;

    await Notes.updateOne({id: req.params.id}, {text: text});
    res.send('Updated')
}))


export default notesRouter;