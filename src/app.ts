import express from "express";
import bodyParser from "body-parser";
import recommendationsRouter from "./routes/recommendations";
import usersRouter from "./routes/users";
import { connectDB } from "./utils/database";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 8000;

// Configure CORS to allow requests from frontend application
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Parse JSON request bodies
app.use(bodyParser.json());

// Register route handlers
app.use("/recommendations", recommendationsRouter);
app.use("/users", usersRouter);

// Initialize database connection and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
