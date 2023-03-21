import User from "../models/User.js";

// export const createUser = async (req, res, next) => {
//     const newUser = new User(req.body)

//     try {
//         const savedUser = await newUser.save();
//         res.status(200).json(savedUser);
//     } catch (error) {
//         next(err)
//     }
// }

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('User deleted');
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        // Only return user data
        const { password, isAdmin, ...otherDetails } = user._doc;

        res.status(200).json({ ...otherDetails });
    } catch (err) {
        next(err)
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find()

        // Only return user data
        const usersData = users.map((u) => {
            const { password, isAdmin, ...otherDetails } = u._doc;
            return { ...otherDetails };
        })

        res.status(200).json(usersData);
    } catch (err) {
        next(err)
    }
}