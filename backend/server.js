import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errormiddleware.js";
import morgan from "morgan";
import path from "path";
//import {passport} from "passport"; 
import { passport } from "./services/passport.js";
import cookieSession from "cookie-session";
import keys from './config/keys.cjs';
import querystring from 'querystring';

dotenv.config();

connectDB();  

const app = express();

app.use(morgan('combined'))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);

app.use("/api/users/watchlist", userRoutes);

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    
    if (req.user) {
      // res.status(201).json({
      //   googleId:0,
      //   _id: req.user.id,
      //   name: req.user.name,
      //   email: req.user.email,
      //   savedStocks: req.user.savedStocks
      // });
      res.redirect(303, '/?' + querystring.stringify(
        {
        googleId:0,
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        savedStocks: req.user.savedStocks
        }
      ));
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
    //res.redirect('/');
  }
);

app.get('/api/logout', (req, res) => {
  req.logout();
  res.send('logged out');
});

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  console.log("in prod");
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.diFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in process ${process.env.NODE_ENV} on port ${PORT}`
  )
);
