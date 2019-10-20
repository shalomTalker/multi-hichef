const mongoose = require('mongoose');
const { Schema } = mongoose;
// Create a schema
const ingrList = new Schema({
    amountImperial: String,
    unit: String,
    ingredient: String
})
const ingredients = new Schema({
    title: String,
    ingrList: [ingrList]
})
const reviews = new Schema({
    review: String,
    ratingValue: Number
})
const diets = new Schema({
    name: String,
    rating: Number
})

const recipeSchema = new Schema({
    title: String,
    link: String,
    dishType: String,
    difficulty: {
        enum: ["easy", "medium", "hard"]
    },
    ingredientsCount: Number,
    specialIdentifier: [String],
    servings: {
        amount: Number,
        unit: String
    },
    prepTime: {
        hours: Number,
        minutes: Number
    },
    cookingTime: {
        hours: Number,
        minutes: Number
    },
    totalTime: {
        hours: Number,
        minutes: Number
    },
    ingredients: [ingredients],
    directions: [String],
    onlyIngredients: [String],
    onlyIngredientsAlsoNeed: [String],
    onlyIngredientsCount: Number,
    tools: [String],
    cookingMethod: [String],
    diets: [diets],
    readyInMinutes: Number,
    recipeCuisine: [String],
    aggregateRating: Number,
    reviewsCount: Number,
    reviews: [reviews]
});

// Create a model
const Recipe = mongoose.model('recipes', recipeSchema);

// Export the model
module.exports = Recipe;










