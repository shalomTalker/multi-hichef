const User = require('../models/User')
module.exports = {
    modify: async (req, res, next) => {
        try {
            let user = await User.findByIdAndUpdate(req.params.id, { preferences :req.body}, { new: true })
            if (user === null) return next(Err(400,"this user is not exist"));
            await user.save()
            res.status(200).json({success:true,resource:user});
        } catch (error) {
            next(error)
        }
    }
}