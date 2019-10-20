const mongoose = require('mongoose');
const { Schema } = mongoose;
// Create a schema
const userSchema = new Schema({
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