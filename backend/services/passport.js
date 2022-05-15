import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oidc';
//import User from "../models/userModel.js";
//const GoogleStrategy = require('passport-google-oidc').Strategy;
//const mongoose = require('mongoose');

//sconst keys = require('../config/keys');
import mongoose from 'mongoose';
import keys from '../config/keys.cjs';

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: refreshToken.id});

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: refreshToken.id,name: refreshToken.displayName, email: refreshToken.emails[0].value,
        savedStocks: ['GOOGL']  }).save();
      
      done(null, user);
    }
  )
);

export { passport };