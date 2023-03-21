import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    matches: {
        type: [String],
    },
    modMatches: {
        type: [String],
    }
},
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);