const express = require('express')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')
const cors = require('cors');

const batchRoute = require("./routes/batch")
const courseRoute = require("./routes/course")
const lessonRoute = require("./routes/lesson")
const studentRoute = require("./routes/student")
const taskRoute = require("./routes/task")



const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
dotEnv.config();
const port = process.env.PORT;



app.use("/batch", batchRoute)
app.use("/course", courseRoute)
app.use("/lesson", lessonRoute)
app.use("/student", studentRoute)
app.use("/task", taskRoute)



app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});




mongoose.connect(process.env.MONGOOSE_URL)
    .then(res => {
        app.listen(process.env.PORT, () => console.log("App is Listening"))
    })
    .catch(err => console.log(err));

