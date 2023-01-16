require('dotenv').config();
const express = require("express");
const { connection } = require('./configs/db');
const { authenticate } = require('./middlewares/authenticate.middleware');
const { noteRouter } = require('./Routes/Note.route');
const { userRouter } = require('./Routes/User.route');
const cors = require("cors")
const app = express();
app.use(cors({
    origin: "*"
}))

app.use(express.json());
app.use("/users", userRouter)
app.get("/", (req, res) => {
    res.send("Welcome to homepage of authentication app");
})

app.use(authenticate)
app.use("/notes", noteRouter)

// {
//     "title":"Backend 2.0",
//     "note":"Learning frontend",
//       "category":"study",
//     "author":"deepak",
//      "status":false
//   }



/* this is for practice of auth app as we did in class there is 
no relation for this app just commented this there is no use for this app 
only for information purpose not deleted if you dont get it remove it in future */
///see bottom only i.e. commented part///

// app.get("/cart", (req, res) => {
//     const token = req.headers.authorization
//     console.log(token)
//     jwt.verify(token, process.env.key, (err, decoded) => {
//         if (err) {
//             res.send("Invalid token");
//             //res.send("Login First to access this")
//             console.log(token);
//         } else {
//             res.send("Welcome to Cart page of authentication app");
//         }
//     });

// })

// app.get("/data", (req, res) => {
//     const token = req.headers.authorization
//     console.log(token)
//     jwt.verify(token, process.env.key, (err, decoded) => {
//         if (err) {
//             //res.send("Login First to access this")
//             res.send("Invalid token");
//         } else {
//             res.send("Welcome to Data page of authentication app");
//         }


//     })
// })







app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`server running at ${process.env.port}`)
    } catch (error) {
        console.log("Truouble connecting to the DB")
        console.log(error)
    }
})
