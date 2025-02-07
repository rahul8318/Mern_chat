import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
dotenv.config();
const PORT = process.env.PORT;
const _dirname = path.resolve();
app.use(express.json());
app.use(cookieParser()); // this is used for parsing cookies

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // ✅ This allows sending cookies/auth headers
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(PORT, () => {
  console.log("Server is running on port 5001");
  connectDB();
});

/*
Cookie parsing is the process of reading and extracting cookies from incoming HTTP requests in a web application. Cookies are small pieces of data that browsers store and send with every request to a server, often used for session management, authentication, and user tracking
*/
// An .env file is a simple text file used to store environment variables in key-value pairs. It is commonly used in Node.js, Express.js, and other frameworks to manage sensitive configuration data such as API keys, database credentials, and other environment-specific settings
