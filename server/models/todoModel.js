const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name:{
        type: String
    },
    dueDate:{
        type: Date
    },
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    }
},{
    timestamps: true
});

const User = mongoose.model('Todo', todoSchema);
module.exports = User;