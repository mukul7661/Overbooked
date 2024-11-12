import express from "express";
import bodyParser from "body-parser";
import recommendationsRouter from "./routes/recommendations";
import usersRouter from "./routes/users";
import { connectDB } from "./utils/database";
import cors from "cors";

const app = express();
const PORT = 9000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());

app.use("/recommendations", recommendationsRouter);
app.use("/users", usersRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
