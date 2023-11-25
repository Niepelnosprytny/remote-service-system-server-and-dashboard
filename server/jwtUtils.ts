import jwt from 'jsonwebtoken';

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

export const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET_KEY);
};