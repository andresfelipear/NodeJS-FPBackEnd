require("dotenv").config()
const express = require("express") 
const morgan = require("morgan") 
const {log} = require("mercedlogger") 
const cors = require("cors") 
const userRoute = require("./routes/user.route") 
const {createContext} = require("./controllers/middleware")

const app = express()

app.use(cors()) 
app.use(morgan("tiny"))
app.use(express.json()) 
app.use(createContext) 


app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
})
app.use("/api/user", userRoute) 

const {PORT = 8000} = process.env
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))