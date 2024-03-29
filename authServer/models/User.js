const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
// const Mailer = require('../services/Mailer')
const verifyTemplate = require('../services/emailTemplates/verifyTemplate');
const keys = require('../config/keys');
const mailer = require('../services/mailer');
// Create a schema
const userSchema = new Schema({
    methods: {
        type: [String],
        required: true
    },
    local: {
        name: String,
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        },
        isVerified: { type: Boolean }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        name: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        },
        name: {
            type: String,
            lowercase: true
        }
    },
    created: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.methods.includes('local')) {
            next();
        }
        //the user schema is instantiated
        const user = this;
        //check if the user has been modified to know if the password has already been hashed
        if (!user.isModified('local.password')) {
            next();
        }
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        // Re-assign hashed version over original, plain text password
        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}
userSchema.methods.sendVerifyMail = async function (contentData) {

    try {
        const info = await mailer.sendEmail('sender@server.com', this.local.email, 'Welcome to Hichef', verifyTemplate(contentData));
    } catch (error)  {
        throw new Error(error);
    }
}

// Create a model
const User = mongoose.model('users', userSchema);

// Export the model
module.exports = User;