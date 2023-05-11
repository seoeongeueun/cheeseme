import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {   
        name: { type: String, required: true, unique: true },
        email: {type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        friends: [
            { 
                name: String,
                fav: Boolean,
            }
        ],
        positions: [
            {
                name: String,
                x: Number,
                y: Number,
                show: Boolean

            }
        ],
        settings: [ Boolean ],
        notifications: [
            {
                notiType: String,
                from: String,
                to: String,
                done: Boolean,
                date: Number
            }
        ],
        stickers: [
            {
                name: String,
                imgSrc: String,
                round: Boolean,
                croppedAreaPixels: {width: Number, height: Number, x: Number, y: Number},
                rotation: Number,
                angle: Number,
                show: Boolean,
                x: Number,
                y: Number

            }
        ],
        token: {type: String}
    }
);

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(parseInt(process.env["SALTROUNDS"], 10), function (err, salt) {
            if (err) { return next(err) };
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) { return next(err) };
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    };
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jsonwebtoken.sign(user._id.toHexString(), process.env.JWT_KEY);

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);

    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    //token decoded
    jsonwebtoken.verify(token, process.env.JWT_KEY, function (err, decoded) {
        user.findOne({ _id: mongoose.Types.ObjectId(decoded), "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })

    })
}

const User = mongoose.model('User', userSchema);
export default User;