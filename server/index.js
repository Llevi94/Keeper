import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; //allow to connect between different servers
import mongoose from "mongoose"; //connect mongoDB
import env from "dotenv"; //read from env file
import notesRouter from "./routes/notes.js"; //get the routes

env.config(); //hidden vars in env file

//**create express server */
const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/**middlewares */
app.use(cors()); //connecting servers
app.use(express.json());
app.use("/notes", notesRouter);

app.use(bodyParser.urlencoded({ extended: true })); //read user inputs

/**Mongo DB connection */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connction established successfully");
});

/**start the server */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
