import mongoose from 'mongoose';

const likeModelSchema = new mongoose.Schema({
    _id: { type: String, trim: true },
    userId: { type: String, trim: true, ref: 'User' },
    postId: { type: String, trim: true, ref: 'Post' },
}, { timestamps: true })

export default mongoose.models.Like || mongoose.model('Like', likeModelSchema)