const mongoose = require('mongoose')
const Schema = mongoose.Schema
const workoutSchema = new Schema({
    workoutPlan: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    eBook: {
        type: String,
        required: true,
        trim: true
    },
    trainerId: {
        type: Schema.Types.ObjectId,
        ref: "trainer",
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
},
{timestamps: true})


const Workout = mongoose.model('workouts', workoutSchema)
module.exports = Workout