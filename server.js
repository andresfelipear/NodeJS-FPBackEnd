require("dotenv").config()
const express = require("express") 
const morgan = require("morgan") 
const {log} = require("mercedlogger") 
const cors = require("cors") 
const userRoute = require("./routes/user.route") 
const {createContext} = require("./controllers/middleware")
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser(process.env.COOKIE_SECRET))
const whitelist = process.env.WHITELIST_DOMAINS ? process.env.WHITELIST_DOMAINS.split(',') : []
const corsOption = {
    origin: (origin, callback) => {
        if(!origin || whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(null, true)
        }
    },
    credentials: true
}

app.use(cors(corsOption)) 
app.use(morgan("tiny"))
app.use(express.json()) 
app.use(createContext) 


app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
})
app.use("/api/user", userRoute) 

const {PORT = 8000} = process.env
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`))