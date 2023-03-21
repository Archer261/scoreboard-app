import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {

        // Create bcrypt hash
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Pass request data to new user object
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        // Add new user
        await newUser.save();

        // Return user data - json
        res.status(201).send('user created');
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {

        // Check if username exists in database
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "user not found"))

        // User bcrypt compare function to check found user password to req user password
        const reqPassword = req.body.password;
        const checkPassword = await bcrypt.compare(reqPassword, user.password)
        if (!checkPassword) return next(createError(400, "Username or password is incorrect..."))
        const { password, isAdmin, ...otherDetails } = user._doc;

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        // If successful: 
        // allow cookies
        // return user data - json
        res.setHeader('Access-Control-Allow-Credentials', 'true'); // set the header in the response
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ ...otherDetails });
    } catch (err) {
        next(err)
    }
}