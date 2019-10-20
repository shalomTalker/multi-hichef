const mongoose = require('mongoose');
const { Schema } = mongoose;
const keys = require('../config/keys');
const Joi = require('joi');
// Create a schema
const userSchema = new Schema({
    profile: {
        age: Number,
        gender: {
            type: String,
            enum: ["male", "female", "unknown"]
        },
        servings: {
            adults: Number,
            children: Number
        },
        allergies: [String],
        diets: [String],
        dislikes: [String],
        missingEquipment: [String],
        levelPreparation: {
            type: String,
            enum: ["easy", "medium", "hard"]
        },
    },
    preferences: {
        ingredients: {
            main: String,
            baseOn: String
        },
        cookingTime: {
            type: Number
        },
    }
});


// Create a model
const User = mongoose.model('users', userSchema);

// Export the model
module.exports = User;