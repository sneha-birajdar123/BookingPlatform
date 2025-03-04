import express from "express";
import config from "config"
import userRouter from "./controllers/users/index.js"
import beauticianRouter from "./controllers/beauticians/index.js"
import "./utils/dbConnect.js";
import publicRouter from "./controllers/public/index.js"
import authMiddleware from "./middleware/auth.js";
import cors from "cors"

const app = express()
const PORT = config.get("PORT")


app.use(cors(
 {
    origin: ["http://127.0.0.1:5173"]

 }
))
app.use(express.json())

app.get("/sneha", (req, res) => {
    try {
        res.status(200).json({msg: "Hi! This is me"})
    } catch (error) {
        res.status(500).json({msg: error})
    }
})

app.use("/api/public", publicRouter)

app.use(authMiddleware)

app.use("/api/private/users", userRouter);
app.use("/api/private/beauticians", beauticianRouter)

app.listen(PORT, () => {
    console.log(`Server is up and running ${PORT}`);
})



