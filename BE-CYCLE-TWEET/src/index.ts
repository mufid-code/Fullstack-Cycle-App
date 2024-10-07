
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { routerv1 } from './routes/v1';
import { setupSwagger } from './docs/swaggerDoc';


var cors = require('cors')
// const bodyParser = require("body-parser");
//For env File 
dotenv.config();
const app = express();
// const app: Application = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", routerv1);

// Setup Swagger di aplikasi
setupSwagger(app);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
    console.log(`API Docs available at http://localhost:${port}/api-docs`);
});

