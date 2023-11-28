import user from "./_models/user"
import connectDB from "./connectDB"

export const getUserById = async (userId) => {
    try {
        await connectDB()
        const selectedUser = await user.findOne({ "clerk.userId": userId }).exec();
        return selectedUser;
    } catch (error) {
        throw new Error(`Failed to fetch current user! ${error}`);
    }
}

export const getTotalUsers = async () => {
    try {
        await connectDB()
        const totalUsers = await user.find().estimatedDocumentCount().exec();
        return totalUsers;
    } catch (error) {
        throw new Error(`Failed to fetch current user! ${error}`);
    }
}