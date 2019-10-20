const mongoose = require('mongoose');

const User = require('../models/User')
const Recipe = require('../models/Recipe');

const Retunner = require('../logic/Retunner');
const rulesModel = require('../logic/rulesModel');

module.exports = {
    retune: async (req, res, next) => {
        try {
            let {
                user, tuning
            } = req.body;

            const rulesTuning = rulesModel({
                ...tuning,
                missingEquipment: user.profile.missingEquipment,
                dislikes: user.profile.dislikes,
                levelPreparation: user.profile.levelPreparation
            })
            //separately retuning
            let retunner, i = 0, recipes = [], retuningData = {};
            while (i < Object.keys(rulesTuning).length) {
                retunner = new Retunner(user, tuning)
                retunner[rulesTuning[i].key] = rulesTuning[i].value
                recipes = await retunner.findRecipes()
                if (recipes.length !== 0) {
                    retuningData[rulesTuning[i].key] = rulesTuning[i].value
                    break;
                };
                i++;
            }
            // gradually retuning
            if (recipes.length === 0) {
                i = 0
                retunner = new Retunner(user, tuning)
                while (i < Object.keys(rulesTuning).length) {
                    retunner[rulesTuning[i].key] = rulesTuning[i].value
                    if (i !== 0) {
                        recipes = await retunner.findRecipes()
                    }
                    if (recipes.length !== 0) {
                        for (let index = 0; index <= i; index++) {
                            retuningData[rulesTuning[index].key] = rulesTuning[index].value
                        }
                        break;
                    };
                    i++;
                }
            }

            res.status(200).json({
                success: true,
                resource: {
                    recipes, retuningData
                }
            })
        } catch (error) {
            next(error)
        }
    }
}