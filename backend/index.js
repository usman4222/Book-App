import express from 'express';
import { PORT, MONGO } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors'
import router from './Routes/BookRoute.js';

const app = express();
app.use(cors({
    origin: ["https://book-app-wrqm.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}))
//middleware for parsing request body
app.use(express.json())
//middleware for handling cors policy
app.use(cors())

app.get('/', (req, res) => {
    console.log("Server is working fine")
})
app.use('/books', router)

mongoose
    .connect(MONGO)
    .then(() => {
        console.log("DB is connected...")

    })
    .catch((error) => {
        console.log("Error while connecting Mongodb", error)

    })


app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
})
