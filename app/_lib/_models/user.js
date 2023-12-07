import mongoose from 'mongoose';

const userModelSchema = new mongoose.Schema({
    _id: { type: String, trim: true },
    clerk: {
        email: { type: String, trim: true, required: true },
        fullName: { type: String, trim: true, required: true },
        profileImageURL: { type: String, trim: true, required: true },
    },
    profile: {
        work: { type: String, trim: true, default: '' },
        location: { type: String, trim: true, default: '' },
        description: { type: String, trim: true, default: '' },
        socialMedia: {
            instagram: { type: String, trim: true, default: '' },
            facebook: { type: String, trim: true, default: '' },
            twitter: { type: String, trim: true, default: '' },
            tiktok: { type: String, trim: true, default: '' },
        },
    }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', userModelSchema)
