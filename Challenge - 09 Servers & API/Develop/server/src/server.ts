import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
const staticFolder = 'client/dist';
app.use(express.static(staticFolder));


// TODO: Implement middleware for parsing JSON and urlencoded form data
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });
app.use(jsonParser);
app.use(urlencodedParser);

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
