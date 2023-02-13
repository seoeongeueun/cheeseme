import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const saltRounds = 10;

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
        token: {type: String}
    }
);

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
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

userSchema.methods.generateToken = function(callback) {
    var user = this;
    var token = jsonwebtoken.sign(user._id.toHexString(), 'secretToken')

    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token;
    user.save(function(err, user) {
        if(err) return callback(err);
        callback(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    //token decoded
    jsonwebtoken.verify(token, 'secretToken', function (err, decoded) {
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })

    })
}

const User = mongoose.model('User', userSchema);
export default User;