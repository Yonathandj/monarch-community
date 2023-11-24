import user from "./_models/user"
import connectDB from "./connectDB"

export const getUserById = async (userId) => {
    try {
        connectDB()
        const selectedUser = await user.findOne({ "clerk.userId": userId }).exec();
        return selectedUser;
    } catch (error) {
        throw new Error('Failed to fetch current user!');
    }
}