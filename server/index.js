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

/**middlewares */
app.use(cors()); //connecting servers
app.use(cors(
  {
    origin: ['https://keeper-khaki.vercel.app'],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true
  }
));
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
