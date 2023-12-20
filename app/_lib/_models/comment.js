import mongoose from 'mongoose';

const commentModelSchema = new mongoose.Schema({
    _id: { type: String, trim: true },
    userId: { type: String, trim: true, ref: 'User' },
    parentId: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
}, { timestamps: true })

export default mongoose.models.Comment || mongoose.model('Comment', commentModelSchema)