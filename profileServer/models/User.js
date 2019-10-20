const mongoose = require('mongoose');
const { Schema } = mongoose;
const keys = require('../config/keys');
// Create a schema
const favoriteSchema = new Schema({
    _recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
})
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
        }
    },
    favorites: [favoriteSchema]
});

// Create a model
const User = mongoose.model('users', userSchema);

// Export the model
module.exports = User;