import mongoose from 'mongoose';
const { Schema } = mongoose;

const MatchSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    isTeams: {
        type: Boolean,
        required: true,
    },
    prizePot: {
        type: Number,
        required: false,
    },

    create_date: {
        type: Date,
        default: Date.now
    },
    contestants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export default mongoose.model("Match", MatchSchema);