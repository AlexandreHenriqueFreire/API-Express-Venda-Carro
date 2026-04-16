import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Car from "./car.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("conectado com o MONGODB")

    } catch (error) {
        console.log("Erro:", error);
    }

}

connectDB();

app.post("/car", async (req, res) => {
    try {

        const newCar = await Car.create(req.body);
        res.json(newCar);
    } catch (error) {
        res.json({ error: error.message });

    }
})

app.get("/car", async (req, res) => {

    try {

        const list = await Car.find();
        res.json(list)

    } catch (error) {

        res.json({ error: error.message })

    }

})


app.get("/car/:id", async (req, res) => {

    try {

        const list = await Car.findById(req.params.id);
        res.json(list)

    } catch (error) {

        res.json({ error: error.message })

    }
})



app.put("/car/:id", async (req, res) => {

      try{

         const updateCar = await User.findByIdAndUpdate(
            req.params.id,
            req.body
         )

         res.json(updateCar)
      }catch (error) {

        res.json({error: error.message})

      }

})


app.delete("/car/:id", async (req, res) => {
    try {
        const carDelet = await Car.findByIdAndDelete(req.params.id)
        res.json(carDelet)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/car/brand/:brand", async (req, res) => {
    try {
        const carBrand = await Car.findOne({ brand: req.params.brand })
        res.json({ carBrand })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/car/availability", async (req, res) => {
    try {
        const carAvailable = await Car.findOne({ available: req.query.available })
        res.json(carAvailable)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.patch("/cars/:id/availability", async (req, res) => {
    try {
        const carUpdated = await Car.findByIdAndUpdate(
            req.params.id,
            { available: req.body.available },
            { new: true }
        )
        res.json(carUpdated)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/cars/price/:min/:max", async (req, res) => {

    try {

        const carPriceRange = await Car.find({ price: { $gte: Number(req.params.min), $lte: Number(req.params.max) } })
        res.json(carPriceRange)

    } catch (error) {

        res.json({ error: error.message })

    }

})

app.get("/car/plate/:plate", async (req, res) => {
    try {
        const carplate = await Car.findOne({ plate: req.params.plate })
        res.json({ carplate })
    } catch (error) {
        res.json({ error: error.message })
    }
})



app.get("cars/avaliable/count", async (req, res) => {
    try {

        const carCount = await Car.countDocumentos({ avaliable: true })
        res.json(carCount);
    } catch (error) {

        res.json({ error: error.message })

    }

})

app.listen(PORT, () =>

    console.log("O servidor está rodando na porta: ", PORT)

);