const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');
const { JWT_SECRET } = require('../config/keys');
const crypto = require('crypto');


signToken = user => {
    return JWT.sign({
        iss: 'CodeWorkr',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        const { email, password,name } = req.value.body;

        // Check if there is a user with the same email
        let foundUser = await User.findOne({ "local.email": email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use' });
        }

        // Is there a Google account with the same email?
        foundUser = await User.findOne({
            $or: [
                { "google.email": email },
                { "facebook.email": email },
            ]
        });
        if (foundUser) {
            // Let's merge them?
            foundUser.methods.push('local')
            foundUser.local = {
                 email,
                 password,
                 name
            }
            await foundUser.save()
            // Generate the token
            const token = signToken(foundUser);
            // Respond with token
            res.cookie('access_token', token, {
                httpOnly: true
            });
            res.status(200).json({ success: true });
        }

        // Is there a Google account with the same email?
        // foundUser = await User.findOne({ "facebook.email": email });
        // if (foundUser) {
        //   // Let's merge them?
        //   foundUser.methods.push('local')
        //   foundUser.local = {
        //     email: email, 
        //     password: password
        //   }
        //   await foundUser.save()
        //   // Generate the token
        //   const token = signToken(foundUser);
        //   // Respond with token
        //   res.status(200).json({ token });
        // }

        // Create a new user
        const newUser = new User({
            methods: ['local'],
            local: {
                email,
                password,
                name
            }
        });

        await newUser.save();

        // Create a verification token for this user
        var verificationToken = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
        // Save the verification token
        await verificationToken.save();
        await newUser.sendVerifyMail({
            actionUrl: `\nhttp:\/\/${req.get('host')}\/auth\/confirmation\/${verificationToken.token}`,
            userName: newUser.local.name
        });

        // Generate the token
        const token = signToken(newUser);
        // Send a cookie containing JWT
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ success: true });
    },
    confirmation: async (req,res,done)=>{
         // Find a matching token
        try{
        const foundToken = await Token.findOne({ token: req.params.token })
        if (!foundToken) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        const foundUser = await User.findOne({ _id: foundToken._userId }) 
            if (!foundUser) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (foundUser.local.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            foundUser.local.isVerified = true;
            await foundUser.save();
            res.status(200).send("The account has been verified. Please log in.");
        } catch(err) {
            return res.status(500).send({ msg: err.message });
        }
    },
    resendToken: async (req,res,done) =>{
        try{
            
            const foundUser = await User.findOne({ email: req.body.email });
            if (!foundUser) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
            if (foundUser.local.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
            var newToken = new Token({ _userId: foundUser._id, token: crypto.randomBytes(16).toString('hex') });
            
            // Save the token
            await newToken.save()
            await newUser.sendVerifyMail({
                actionUrl: `\nhttp:\/\/${req.get('host')}\/auth\/confirmation\/${verificationToken.token}`,
                userName: newUser.local.name
            });
        } catch(err){
            return res.status(500).send({ msg: err.message });
        }
    },
    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ success: true });
    },

    signOut: async (req, res, next) => {
        res.clearCookie('access_token');
        res.json({ success: true });
    },

    googleOAuth: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ success: true });
    },

    linkGoogle: async (req, res, next) => {
        res.json({
            success: true,
            methods: req.user.methods,
            message: 'Successfully linked account with Google'
        });
    },

    unlinkGoogle: async (req, res, next) => {
        // Delete Google sub-object
        if (req.user.google) {
            req.user.google = undefined
        }
        // Remove 'google' from methods array
        const googleStrPos = req.user.methods.indexOf('google')
        if (googleStrPos >= 0) {
            req.user.methods.splice(googleStrPos, 1)
        }
        await req.user.save()

        // Return something?
        res.json({
            success: true,
            methods: req.user.methods,
            message: 'Successfully unlinked account from Google'
        });
    },

    facebookOAuth: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        res.status(200).json({ success: true });
    },

    linkFacebook: async (req, res, next) => {
        res.json({
            success: true,
            methods: req.user.methods,
            message: 'Successfully linked account with Facebook'
        });
    },

    unlinkFacebook: async (req, res, next) => {
        // Delete Facebook sub-object
        if (req.user.facebook) {
            req.user.facebook = undefined
        }
        // Remove 'facebook' from methods array
        const facebookStrPos = req.user.methods.indexOf('facebook')
        if (facebookStrPos >= 0) {
            req.user.methods.splice(facebookStrPos, 1)
        }
        await req.user.save()

        // Return something?
        res.json({
            success: true,
            methods: req.user.methods,
            message: 'Successfully unlinked account from Facebook'
        });
    },

    dashboard: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({
            secret: "resource",
            methods: req.user.methods
        });
    },

    checkAuth: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({ success: true });
    }
    
}