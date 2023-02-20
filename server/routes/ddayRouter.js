import express from 'express';
import Dday from '../models/ddayModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const ddayRouter = express.Router();

ddayRouter.get('/', asyncHandler(async(req, res) => {
    const dday = await Dday.find({});
    res.send(dday);
}));

// ddayRouter.get('/:date', asyncHandler(async(req, res) => {
//     const dday = await Dday.findOne({date: req.params.date});
//     res.send(dday);
// }));

ddayRouter.get('/getByOwner/:owner', asyncHandler(async(req, res) => {
    const dday = await Dday.findOne({ owner: req.params.owner });
    res.send(dday);
}));

ddayRouter.post('/add', asyncHandler(async(req, res) => {
    const owner = req.body.owner;
    const text = req.body.text;
    const end = req.body.end;
    const start = req.body.start;
    await Dday.create({ owner, start, text, end })
    res.send('Created')
}));

ddayRouter.get('/search/text/:keyword', asyncHandler(async(req, res) => {
    const dday = await Dday.find({ text: {$regex : req.params.keyword, '$options' : 'i'}});
    res.send(dday)
}))

ddayRouter.delete("/delete/:owner", asyncHandler(async(req, res) => {
    await Dday.deleteOne({owner: req.params.owner});
    res.send('Deleted');
}));

ddayRouter.post('/update/:owner', asyncHandler(async(req, res) => {
    const text = req.body.text;
    const start = req.body.start;
    const end = req.body.end;
    await Dday.updateOne({owner: req.params.owner}, {text: text, start: start, end: end});
    res.send('Updated')
}))

ddayRouter.post('/updateById/:_id', asyncHandler(async(req, res) => {
    const text = req.body.text;
    const start = req.body.start;
    const end = req.body.end;
    await Dday.updateOne({_id: req.params._id}, {text: text, start: start, end: end});
    res.send('Updated')
}))


export default ddayRouter;