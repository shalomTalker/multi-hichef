const Recipe = require('../models/Recipe');
const User = require('../models/User');
module.exports = class Tunner {
    constructor(user, {
        tuneIngredients = [],
        tuneAmount,
        tuneTiming,
        tuneSpecial = {},
        tuneEquipment = [],
        tuneMethods = [],
        tuneLevelPreparation
    }) {
        this.userId = user.id;
        this.ingredients = user.preferences.ingredients;
        this.cookingTime = tuneTiming || user.preferences.cookingTime;
        this.age = user.profile.age;
        this.gender = user.profile.gender;
        this.servings = user.profile.servings;
        this.allergies = user.profile.allergies;
        this.diets = user.profile.diets;
        this.dislikes = user.profile.dislikes.concat(tuneIngredients
            .filter(obj => !user.profile.dislikes.includes(obj.ingredient))
            .map(obj => obj.ingredient));
        this.missingEquipment = user.profile.missingEquipment.concat(tuneEquipment
            .filter(obj => !user.profile.missingEquipment.includes(obj.tool))
            .map(obj => obj.tool));
        this.levelPreparation = tuneLevelPreparation || user.profile.levelPreparation;
        this.unwantedMethods = tuneMethods;
        this.tuneSpecial = tuneSpecial;
        this.tuneAmount = tuneAmount;
    }
    updateProfile = async ({ tuneEquipment = [], tuneIngredients = [] }) => {
        try {
            tuneEquipment = tuneEquipment
                .filter(obj => obj.reason.includes('dont have'))
                .map(obj => obj.tool)
            tuneIngredients = tuneIngredients
                .filter(obj => obj.reason.includes('dont like'))
                .map(obj => obj.ingredient)
            await User.findOneAndUpdate({ _id: this.userId, 'profile.dislikes': { $ne: tuneIngredients } }, { $addToSet: { 'profile.dislikes': tuneIngredients } })
            await User.findOneAndUpdate({ _id: this.userId, 'profile.missingEquipment': { $ne: tuneEquipment } }, { $addToSet: { 'profile.missingEquipment': tuneEquipment } })
        } catch (error) {
            throw Err(error)
        }

    }
    findRecipes = async () => {
        const createQueries = () => {
            const generateRegexp = (keysArray, options) => [...new Set(keysArray.map(key => new RegExp(key, options)))]
            const ingredientsQueriesObj = (ingredients) => {
                let ingredientsRegex = generateRegexp(ingredients)
                return (ingredients.length !== 0) ?
                    {
                        directions: { $nin: ingredientsRegex },
                        onlyIngredients: { $nin: ingredientsRegex },
                        'ingredients.ingrList.ingredient': { $nin: ingredientsRegex }
                    } : {}
            }
            const dietsQueriesObj = (this.diets.length !== 0) ?
                { $and: this.diets.map(diet => ({ 'diets.name': { $in: generateRegexp([diet]) } })) } :
                {}

            const toolsQueriesObj = () => {
                let missingEquipmentRegex = generateRegexp(this.missingEquipment)

                return (this.missingEquipment.length !== 0) ?
                    {
                        tools: { $nin: generateRegexp(missingEquipmentRegex) }
                    } : {}
            }
            const timeLimitQueryObj = (this.cookingTime !== 0) ? { readyInMinutes: { $lte: this.cookingTime } } : {}
            const difficultyQueriesObj = () => {
                if (typeof this.levelPreparation !== "object") {
                    switch (this.levelPreparation) {
                        case 'easy':
                            return { difficulty: this.levelPreparation }
                            break;
                        case 'medium':
                            return { difficulty: { $ne: 'hard' } }
                            break;
                        default:
                            return {}
                            break;
                    }
                } else {
                    return {}
                }
            };
            const mainQueryObj = (this.ingredients.main !== 'none') ? { mainIngredient: this.ingredients.main } : { mainIngredient: "" }
            const baseOnQueryObj = (this.ingredients.baseOn !== 'none') ? { baseOnIngredient: this.ingredients.baseOn } : { baseOnIngredient: "" }

            const tuneAmountQueryObj = (this.tuneAmount) ? { onlyIngredientsCount: { $lte: this.tuneAmount } } : {}
            const tuneSpecialQueryObj = (typeof this.tuneSpecial !== "object") ? { specialIdentifier: { $in: generateRegexp([this.tuneSpecial]) } } : {}
            const tuneMethodsQueryObj = (this.unwantedMethods.length !== 0) ? { 'cookingMethod': { $nin: generateRegexp(this.unwantedMethods) } } : {}

            let queries = [
                // filter by profile & core
                //  servingsQueriesObj,
                ingredientsQueriesObj(this.allergies),
                ingredientsQueriesObj(this.dislikes),
                dietsQueriesObj,
                timeLimitQueryObj,
                difficultyQueriesObj(),
                mainQueryObj,
                baseOnQueryObj,
                //  tuning
                tuneSpecialQueryObj,
                tuneAmountQueryObj,
                toolsQueriesObj(),
                tuneMethodsQueryObj
            ]

            return queries;
        }
        try {
            const queries = createQueries();
            const sortByArg = (this.diets.length !== 0) ? 'diets.rating' : 'aggregateRating'

            return await Recipe.find({ $and: queries }, null, { [sortByArg]: 1 }).exec()

        } catch (error) {
            throw Err(error);
        }
    }
    pickDifferentIdentifiers = async (recipes) => {

        try {
            if (recipes.length === 0) {
                return []
            }
            const recipeIdentifiers = recipes[0].specialIdentifier
            let identifierArr = [], obj = {}
            recipes
                .reduce((prev, cur, i, arr) => prev.concat(cur.specialIdentifier), [])
                .filter(identifier => !recipeIdentifiers.includes(identifier))
                .forEach(identifier => {
                    (obj[identifier]) ? obj[identifier]++ : obj[identifier] = 1
                })

            obj = Object.entries(obj).sort((a, b) => b[1] - a[1])
            const counter = (obj.length < 5) ? obj.length : 5;
            for (let i = 0; i < counter; i++) {
                identifierArr.push(obj[i][0])
            }
            return identifierArr;
        } catch (error) {
            throw Err(error)
        }
    }

}