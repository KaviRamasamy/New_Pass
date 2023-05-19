import mongoose from "mongoose";

const User = mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Users", User);
