const mongoose = require('mongoose');

const {Schema} = mongoose;

const tokenSchema = new Schema({
    _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

// Create a model
const Token = mongoose.model('token', tokenSchema);

// Export the model
module.exports = Token;