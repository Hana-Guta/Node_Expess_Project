const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
       type : String,
       required :[true , "please add the username"] 
    },
    email:{
        type:String,
        required : [true , "please add the user email"],
        unique :[true , "email address already taken"]
    },
    password:{
        type:String,
        required: [true , "please add he user password"]
    }
},
{
    timestamps : true
}
);

module.exports=mongoose.model("user" , userSchema)