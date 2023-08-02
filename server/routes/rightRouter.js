import express from 'express';
import Right from '../models/rightModel.js';
import asyncHandler from '../utils/asyncHandler.js';

const rightRouter = express.Router();

rightRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const right = await Right.find({});
    res.send(right);
  })
);

rightRouter.get(
  '/:date',
  asyncHandler(async (req, res) => {
    const right = await Right.findOne({ date: req.params.date });
    res.send(right);
  })
);

rightRouter.get(
  '/getByOwner/:owner',
  asyncHandler(async (req, res) => {
    const right = await Right.find({ owner: req.params.owner });
    res.send(right);
  })
);

rightRouter.get(
  '/search/text/:keyword',
  asyncHandler(async (req, res) => {
    const right = await Right.find({
      text: { $regex: req.params.keyword, $options: 'i' },
    });
    res.send(right);
  })
);

rightRouter.get(
  '/search/title/:keyword',
  asyncHandler(async (req, res) => {
    const right = await Right.find({
      title: { $regex: req.params.keyword, $options: 'i' },
    });
    res.send(right);
  })
);

rightRouter.post(
  '/add',
  asyncHandler(async (req, res) => {
    const owner = req.body.owner;
    const date = req.body.date;
    const text = req.body.text;
    const title = req.body.title;
    const like = req.body.like;
    const weather = req.body.weather;
    const bookmark = req.body.bookmark;
    const hide = req.body.hide;
    const likes = req.body.likes;
    const imgUrl = req.body.imgUrl;
    const plain = req.body.plain;
    const grid = req.body.grid;
    await Right.create({
      owner,
      date,
      text,
      title,
      like,
      weather,
      bookmark,
      hide,
      likes,
      imgUrl,
      plain,
      grid,
    });
    res.send('Created');
  })
);

rightRouter.delete(
  '/delete/:date',
  asyncHandler(async (req, res) => {
    await Right.deleteOne({ date: req.params.date });
    res.send('Deleted');
  })
);

rightRouter.post(
  '/update/:date',
  asyncHandler(async (req, res) => {
    const text = req.body.text;
    const title = req.body.title;
    const like = req.body.like;
    const weather = req.body.weather;
    const bookmark = req.body.bookmark;
    const hide = req.body.hide;
    const likes = req.body.likes;
    const imgUrl = req.body.imgUrl;
    const plain = req.body.plain;
    const grid = req.body.grid;
    await Right.updateOne(
      { date: req.params.date },
      {
        text: text,
        title: title,
        like: like,
        weather: weather,
        bookmark: bookmark,
        hide: hide,
        likes: likes,
        imgUrl: imgUrl,
        plain: plain,
        grid: grid,
      }
    );
    res.send('Updated');
  })
);

rightRouter.post(
  '/updateById/:_id',
  asyncHandler(async (req, res) => {
    const text = req.body.text;
    const title = req.body.title;
    const like = req.body.like;
    const weather = req.body.weather;
    const bookmark = req.body.bookmark;
    const hide = req.body.hide;
    const likes = req.body.likes;
    const imgUrl = req.body.imgUrl;
    const plain = req.body.plain;
    const grid = req.body.grid;
    await Right.updateOne(
      { _id: req.params._id },
      {
        text: text,
        title: title,
        like: like,
        weather: weather,
        bookmark: bookmark,
        hide: hide,
        likes: likes,
        imgUrl: imgUrl,
        plain: plain,
        grid: grid,
      }
    );
    res.send('Updated');
  })
);

export default rightRouter;
