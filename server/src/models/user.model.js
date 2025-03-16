const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    username : {type : String, required : true},
    email : {type : String, required : true, unique: true},
    password : {type : String, required : true},
    role : {type : String, enum :["user", "admin"], default : "user"},
    photo : {type : String, default : "https://img.freepik.com/premium-photo/user-icon-person-symbol-human-avatar-3d-render_473931-217.jpg?w=740"}
})

const User = model("users", userSchema);
module.exports = User;