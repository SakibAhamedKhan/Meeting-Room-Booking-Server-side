import bycryptjs from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken';

export const isPasswordMatched = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
    const isMatched = await bycryptjs.compare(plainPassword, hashedPassword);
    return isMatched;
};


export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const createToken = (
  jwtPayload: { email: string; role:"ADMIN" | "CUSTOMER" | "PARTNER" | "SUBADMIN" },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
