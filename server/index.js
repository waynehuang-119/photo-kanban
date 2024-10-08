import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import postRoutes from './routes/posts.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING.');
})

// // // Server static assets if in production
// if (process.env.NODE_ENV === "production") {
//     console.log("Running server in production mode");
//     // Set static folder
//     app.use(express.static(path.resolve(__dirname, "build")));
//     // app.use(express.static(path.join(__dirname, "build"), { dotfiles: "allow" }));
//     app.get("*", (req, res) => {
//       res.sendFile(
//         path.resolve(__dirname, "build", "index.html")
//       );
//     });
// }


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 4000;
mongoose.set('strictQuery', false);

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true})
    .then(() => app.listen(PORT, () => console.log('Server running on port:', PORT)))
    .catch((error) => console.log(error.message));








