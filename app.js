// app.js
require("dotenv").config();
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const path     = require("path");

const authRoutes    = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes    = require("./routes/userRoutes");
const adminRoutes   = require("./routes/adminRoutes");
const reviewRoutes  = require("./routes/reviewRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const orderRoutes    = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

const ratingRouter = require('./Routers/ratingRouter');
app.use('/api/rating', ratingRouter);
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
