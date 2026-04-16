import mongoose from "mongoose";

const CarsSchema = new mongoose.Schema(
    {
        Model: String,
        Brand: String,
        Year: Number,
        Color: String,
        Available: Boolean,
        Plate: String

    },
    { collection: "Cars" }
);

export default mongoose.model("Cars", CarsSchema);