import mongoose from 'mongoose';

const bookmarkModelSchema = new mongoose.Schema({
    _id: { type: String, trim: true },
    userId: { type: String, trim: true, ref: 'User' },
    postId: { type: String, trim: true, ref: 'Post' },
}, { timestamps: true })

export default mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkModelSchema)