import mongoose from 'mongoose';

const postModelSchema = new mongoose.Schema({
    _id: { type: String, trim: true },
    userId: { type: String, trim: true, ref: 'User' },
    data: {
        tags: { type: Array, default: [] },
        title: { type: String, trim: true, default: '' },
        content: { type: String, trim: true, default: '[]' },
        headerImageURL: { type: mongoose.Schema.Types.Mixed, trim: true, default: '' },
    },
    isPublished: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.models.Post || mongoose.model('Post', postModelSchema)