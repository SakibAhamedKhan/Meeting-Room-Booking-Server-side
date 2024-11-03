import bycryptjs from 'bcryptjs'

export const isPasswordMatched = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
    const isMatched = await bycryptjs.compare(plainPassword, hashedPassword);
    return isMatched;
};
