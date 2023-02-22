import mongoose from "mongoose";

const StarbucksSchema = new mongoose.Schema({
    name: String,
    image: String
})

export const Starbucks = mongoose.model("Starbucks", StarbucksSchema)