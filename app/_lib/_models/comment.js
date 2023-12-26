import mongoose from 'mongoose';

const commentModelSchema = new mongoose.Schema({
    _id: { type: String, trim: true },
    userId: { type: String, trim: true, ref: 'User' },
    comment: { type: String, trim: true, default: '' },
    parentCommentId: { type: String, trim: true, default: null },
}, { timestamps: true })

export default mongoose.models.Comment || mongoose.model('Comment', commentModelSchema)