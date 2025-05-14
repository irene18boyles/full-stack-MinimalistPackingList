import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: { type: String, required: true },
    category: { type: String, required: true },
    trip: { type: String, required: true },
    isPacked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema)