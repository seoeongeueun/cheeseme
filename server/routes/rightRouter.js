import express from 'express';
import Right from '../models/rightModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const rightRouter = express.Router();

rightRouter.get('/', asyncHandler(async(req, res) => {
    const right = await Right.find({});
    res.send(right);
}))

rightRouter.get('/:date', asyncHandler(async(req, res) => {
    const right = await Right.findOne({ date: req.params.date });
    res.send(right);
}));

rightRouter.get('/search/text/:keyword', asyncHandler(async(req, res) => {
    const right = await Right.find({ text: {$regex : req.params.keyword}});
    res.send(right)
}));

rightRouter.get('/search/title/:keyword', asyncHandler(async(req, res) => {
    const right = await Right.find({ title: {$regex : req.params.keyword}});
    res.send(right)
}));

rightRouter.post('/add', asyncHandler(async(req, res) => {
    const date = req.body.date;
    const text = req.body.text;
    const title = req.body.title;
    const like = req.body.like;
    const weather = req.body.weather;
    const bookmark = req.body.bookmark;
    await Right.create({ date, text, title, like, weather, bookmark });
    res.send('Created');
}))

rightRouter.delete("/delete/:date", asyncHandler(async(req, res) => {
    await Right.deleteOne({date: req.params.date});
    res.send('Deleted');
}));

rightRouter.post('/update/:date', asyncHandler(async(req, res) => {
    const text = req.body.text;
    const title = req.body.title;
    const like = req.body.like;
    const weather = req.body.weather;
    const bookmark = req.body.bookmark;
    await Right.updateOne({date: req.params.date}, {text: text, title: title, like: like, weather: weather, bookmark: bookmark});
    res.send('Updated')
}))


export default rightRouter;