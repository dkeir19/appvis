import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      savedStocks: user.savedStocks,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc register a new user
// @route GET /api/users
// @access Private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(email);
  console.log(password);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    savedStocks: ['GOOGL']
  });

  if (user) {
    res.status(201).json({
      googleId:'',
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      savedStocks: user.savedStocks,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      savedStocks:updatedUser.savedStocks,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc add stock to watchlist
// @route POST /api/watchlist
// @access Private
const watchList = asyncHandler(async (req, res) => {
  console.log('in watchlist');
  console.log(req.body.loggedUser._id)
  const user = await User.findById(req.body.loggedUser._id);
  const ticker = req.body.ticker;

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    console.log(user.savedStocks);
    // const a = await User.find({savedStocks:ticker})
    const found = user.savedStocks.find(element => element == ticker);

    if(found  ==undefined  )  {
      // debugger;
      user.savedStocks.push(ticker);
      console.log(user.savedStocks);
      const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      savedStocks: updatedUser.savedStocks,
      token: generateToken(updatedUser._id),
    });
  }
  else {
    res.status(404);
    res.json({})
  }

  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const watchListRemove = asyncHandler(async (req, res) => {
  console.log('in watchlistremove');
  console.log(req.body.loggedUser._id)
  const user = await User.findById(req.body.loggedUser._id);
  const ticker = req.body.ticker;

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    user.savedStocks.pull(ticker);

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      savedStocks: updatedUser.savedStocks,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile, updateUserProfile, watchList, watchListRemove };
