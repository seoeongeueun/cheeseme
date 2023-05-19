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
    origin: ['https://cheeseme.netlify.app', 'https://cheeseme.netlify.app/'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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

const myConfig = new AWS.Config({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
    region: process.env.AWS_REGION,
  });

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(myConfig),
    bucket: 'cheeseme-bucket',
    key(req, file, cb) {
      cb(null, `images/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

app.post('/deleteImg/:src', asyncHandler(async(req, res) => {
    const img = await s3.deleteObject({Bucket: 'cheeseme-bucket', Key: `images/${req.params.id}`})
    if (!img) return res.json({error: err})
    res.json({message: 'Image Deleted'});
}));

app.post('/upload', upload.single('image'), async (req, res) => {
    return res.json(req.file.location);
});

// const fileStorage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null, 'images');
//     },
//     filename: (req,file,cb)=>{ 
//         cb(null, new Date().valueOf() + path.extname(file.originalname));
//     }
// });
// const fileFilter = (req,file,cb) => {
//     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
//         cb(null,true); 
//     }
//     else{
//         cb(null,false);
//     }
// };

// app.post('/upload', multer({storage :fileStorage, fileFilter:fileFilter}).single('image'), (req, res) => {
//     const image = req.file;
//     console.log("uploaded image: ", image)
//     const imgUrl = image.path;
//     res.send(imgUrl);
// });

// app.post('/deleteImg/:src', (req, res) => {
//     console.log(req.params.src)
//     fs.unlink(`./images/${req.params.src}`, (err) => {
//       if (err) {
//         res.status(500).json({ error: err });
//         return;
//       }
//       res.status(200).json({ message: 'Image deleted' });
//     });
// });

// app.use('/images',express.static(path.join(__dirname,'images')))



app.get('/logout', auth, (req, res) => {
    //미들웨어에서 가져옴
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

// Serve static files from the client/build directory
app.use(express.static(path.join(__dirname, 'client', 'public')));

const indexPath = path.join(__dirname, '..', 'client', 'public', 'index.html');

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});