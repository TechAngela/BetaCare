import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = 7070;

// Middleware
app.use(bodyParser.json());

// Mount API routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
