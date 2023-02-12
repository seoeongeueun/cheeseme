import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    }
);

userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);
export default User;