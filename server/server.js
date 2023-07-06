import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import notesRouter from './routes/notesRouter.js';
import todosRouter from './routes/todosRouter.js';
import ddayRouter from './routes/ddayRouter.js';
import positionRouter from './routes/positionRouter.js';
import widgetRouter from './routes/widgetRouter.js';
import rightRouter from './routes/rightRouter.js'
import reminderRouter from './routes/reminderRouter.js'
import clockRouter from './routes/clockRouter.js';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import asyncHandler from './utils/asyncHandler.js';
import User from './models/userModel.js';
import cookieParser from 'cookie-parser';
import { auth } from './routes/userRouter.js';
import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import AWS from '@aws-sdk/client-s3';

const app = express();
const port = process.env.PORT || 8080;
const ORIGIN = process.env.ORIGIN ? process.env.ORIGIN : "127.0.0.1:3000";
const __dirname = path.resolve();

dotenv.config();
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['https://cheeseme.netlify.app', 'https://cheeseme.netlify.app/', "https://cheesemebucket.s3.ap-northeast-2.amazonaws.com/", "https://cheesemebucket.s3.ap-northeast-2.amazonaws.com",
        process.env.NODE_ENV !== 'production' && 'http://localhost:3000/', process.env.NODE_ENV !== 'production' && 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', process.env.NODE_ENV !== 'production' && '*'],
    credentials: true
  }));
app.use(cookieParser());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to db')
}).catch( err => {
    console.log(err.message);
});

app.use('/api/notes', notesRouter);
app.use('/api/todos', todosRouter);
app.use('/api/dday', ddayRouter);
app.use('/api/position', positionRouter);
app.use('/api/widget', widgetRouter);
app.use('/api/right', rightRouter);
app.use('/api/users', userRouter);
app.use('/api/reminder', reminderRouter);
app.use('/api/clock', clockRouter);

const myS3 = new AWS.S3({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_KEY
    }
});

const upload = multer({
  storage: multerS3({
    s3: myS3,
    bucket: 'cheesemebucket',
    key(req, file, cb) {
    const randomInt = Math.floor(Math.random() * 100) + 1;
    const fileExtension = path.extname(file.originalname);
      cb(null, `images/${Date.now()}_${randomInt}${fileExtension}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  acl: 'public-read-write'
});

app.post('/deleteImg/:src', asyncHandler(async (req, res) => {
    try {
        const img = await myS3.deleteObject({ Bucket: 'cheesemebucket', Key: `images/${req.params.src}` });
        if (!img) {
          return res.json({ error: 'Failed to delete image' });
        }
        return res.json({ message: 'Image deleted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }))

app.post('/upload', upload.single('image'), async (req, res) => {
    console.log(req.file.loctaion)
    return res.json(req.file.location);
});


app.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.user._id) },
        { token: '' },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            else return res.status(200).send({
                success: true
            })
        }
    )
    res.cookie('x_auth', null, {
        maxAge: 0,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
})
app.options('/login', cors());
app.post('/login', asyncHandler(async(req, res) => {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.json({ loginSuccess: false, message: "No user found with username " + req.body.name });

    user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) return res.json({ loginSuccess: false, message: "Incorrect Password"});

        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            res.cookie("x_auth", user.token, {
                    maxAge: 1000 * 60 * 60 * 24 * 2,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                })
                .status(200)
                .json({ loginSuccess: true, userId: user._id });
        })
    })
}))

app.get('/checkCookie', (req, res) => {
    const xAuthCookieExists = !!req.cookies['x_auth'];
    res.send(xAuthCookieExists);
});

app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'images', imageName);
    res.sendFile(imagePath);
});

app.get('/manifest.json', (req, res) => {
    const filePath = path.join(__dirname, '..', 'client', 'public', 'manifest.json');
    res.sendFile(filePath);
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, 'client', 'public')));

const indexPath = path.join(__dirname, '..', 'client', 'public', 'index.html');

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});