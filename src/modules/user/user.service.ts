import { User } from "./user.model"

const register = async (payload) => {
    const result = await User.create(payload);
    return result;
}


export const UserService = {
    register,
}