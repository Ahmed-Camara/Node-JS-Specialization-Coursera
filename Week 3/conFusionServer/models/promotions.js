const mongoose = require('mongoose');
const schema = mongoose.Schema;
//require('mongoose-currency').loadType(mongoose);
//const Currency = mongoose.Types.Currency;


const promoSchema =  schema({

    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:String,
        default:false
    },

},{
    timestamps:true
});

const Promotions = mongoose.model('promotion',promoSchema);

module.exports = Promotions;