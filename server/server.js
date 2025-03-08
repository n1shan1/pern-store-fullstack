import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import productRouter from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import path from "path";

//initializations and PORT
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// console.log(PORT);

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet({ contentSecurityPolicy: false }));

//routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ message: "[server]: Too many requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ message: "[server]: Bot detected" });
      } else {
        res.status(403).json({ message: "[server]: Forbidden" });
      }
      return null;
    }
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ message: "[server]: Bot detected" });
      return null;
    }
    next();
  } catch (error) {
    console.error("[server]: Error in Arcjet:", error);
    res.status(500).json({ message: "[server]: Internal Server Error" });
  }
});

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  //serve react app
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

//init db
const initDB = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("[server]: Database initialized successfully!");
  } catch (error) {
    console.error("[server]: Error initializing database:", error);
  }
};
initDB();

//app listen
app.listen(PORT, () => {
  console.log("[server]: Server is running on port:", PORT);
});
