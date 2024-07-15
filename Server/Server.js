const express = require('express');
const app = express();
const {userRouter} = require('./routes/userRoute');
const {blogRouter} = require('./routes/blogRoute');
const cors = require('cors'); 
const PORT = 8787;

app.get("/",(req,res) => {
    res.send("Hello World")
})

app.use(express.json())
app.use(cors());
app.use("/api/user",userRouter);
app.use("/api/blog",blogRouter)

app.listen(PORT,() => {
    console.log("The app is listening on port " + PORT);
})