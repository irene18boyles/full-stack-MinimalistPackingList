import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: String, required: true},
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true});

export default mongoose.model('Trip', tripSchema)