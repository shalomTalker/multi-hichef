const User = require('../models/User')
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const Tunner = require('../logic/Tunner')
const axios = require('axios')
module.exports = {
    tuneRecipe: async (req, res, next) => {
        try {
            let identifierArr;
            const user = await User.findById(req.params.id)
            if (user === null) return next(Err(400, "this user is not exist"));
            let tunner = new Tunner(user, req.body)
            let recipes = await tunner.findRecipes();
            await tunner.updateProfile(req.body)
            if (recipes.length === 0) {
                const { data } = await axios.post('http://retuning:8004/', { user, tuning: req.body })

                identifierArr = await tunner.pickDifferentIdentifiers(data.resource.recipes)

                return res.status(200).json({
                    success: true,
                    resource: {
                        recipe: data.resource.recipes[0],
                        retuningData: data.resource.retuningData,
                        specialIdentifier: identifierArr
                    }
                })
            }
            identifierArr = await tunner.pickDifferentIdentifiers(recipes)

            res.status(200).json({
                success: true,
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