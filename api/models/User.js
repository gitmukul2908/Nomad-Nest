const { mongoose, Schema } = require('mongoose')

const UserSchema = new Schema({
    name: {type: String,  required: true},
    email: { type: String, unique: true, required: true},
    password: {type: String, required: true}
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;