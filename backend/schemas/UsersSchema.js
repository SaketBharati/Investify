const {Schema}= require("mongoose");

const UsersSchema= new Schema({
    username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: {
  type: Number,
  default: 100000,
},
});

module.exports= {UsersSchema};