import Match from "../models/Match.js";
import User from "../models/User.js";

export const createMatch = async (req, res, next) => {
    const newMatch = new Match(req.body)

    try {
        const savedMatch = await newMatch.save();
        res.status(200).json(savedMatch);
    } catch (error) {
        next(err)
    }
}

export const updateMatch = async (req, res, next) => {
    try {
        const updatedMatch = await Match.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedMatch);
    } catch (err) {
        next(err)
    }
}

export const deleteMatch = async (req, res, next) => {

    const users = await User.find({ matches: { $in: req.params.id } })

    try {
        await Match.findByIdAndDelete(req.params.id)
        // try {
        //     await User.findByIdAndUpdate(UserId, { $pull: { matches: req.params.id } })
        // } catch (err) {
        //     next(err)
        // }
        res.status(200).json('Match deleted');
    } catch (err) {
        next(err)
    }
}

export const getMatch = async (req, res, next) => {
    try {
        const match = await Match.findById(req.params.id)
        res.status(200).json(match);
    } catch (err) {
        next(err)
    }
}

export const getAllMatch = async (req, res, next) => {
    try {
        const matches = await Match.find()
        res.status(200).json(matches);
    } catch (err) {
        next(err)
    }
}