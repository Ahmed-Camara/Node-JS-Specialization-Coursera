const mongoose = require('mongoose');
const schema = mongoose.schema;

const commentSchema = new schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },

    comment:{
        type:String,
        required:true
    },

    author : {
        type: String,
        required : true
    }

},{
    timestamps:true
});

const dishSchema = new schema({
    name:{
        type:String,
        required:true,
        unique:true
    },

    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;