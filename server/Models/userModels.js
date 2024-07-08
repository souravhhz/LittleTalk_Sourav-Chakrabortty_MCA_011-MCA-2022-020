const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    actype:{
        type:Number,
        required:true
    },
    accountId:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30,
        unique:true
    },
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        minlength:6,
        maxlength:100,
        unique:true
    },
    about:{
        type:String,
        minlength:3,
        maxlength:1000,
        default:'You are a champion.'
    },
    facebook:{
        type:String,
        maxlength:5000,
        default:''
    },
    instagram:{
        type:String,
        maxlength:5000,
        default:''
    },
    youtube:{
        type:String,
        maxlength:5000,
        default:''
    },
    github:{
        type:String,
        maxlength:5000,
        default:''
    },
    twitter:{
        type:String,
        maxlength:5000,
        default:''
    },
    linkedin:{
        type:String,
        maxlength:5000,
        default:''
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:300
    }},{
        timestamps:true,
});

const userModels = mongoose.model('User',userSchema)

module.exports = userModels
