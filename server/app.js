// require('dotenv').config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import connectDB from './db/db.js';
import authenticateToken from './middleware/auth.middleware.js';
import usersRouter from './routes/user.routes.js';


const app = express();

connectDB();

app.use(json());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


app.use('/api/v1', usersRouter);

app.get('/', authenticateToken, (req, res) => {
  console.log(req.user);
  res.status(200).json({ message: "User Headers Authorization" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});