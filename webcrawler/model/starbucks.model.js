import mongoose from "mongoose";

const StarbucksSchema = new mongoose.Schema({
    type: String,
    name: String,
    img: String
})

export const Starbucks = mongoose.model("Starbucks", StarbucksSchema)