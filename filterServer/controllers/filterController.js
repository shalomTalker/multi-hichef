const User = require('../models/User')
const Recipe = require('../models/Recipe');
const Filter = require('../logic/Filter')
module.exports = {
    filterRecipe: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id)
            if (user === null) return next(Err(400, "this user is not exist"));
            let filter = new Filter(user.toObject())
            let recipes = await filter.findRecipes()
            const identifierArr = await filter.pickDifferentIdentifiers(recipes)

            res.status(200).json({
                success:true,
                resource: {
                    recipe: recipes[0],
                    specialIdentifier: identifierArr
                }
            });
        } catch (error) {
            next(error)
        }
    }
}