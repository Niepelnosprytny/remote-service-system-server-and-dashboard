import jwt from 'jsonwebtoken';

export const signToken = (payload) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), //1 day expiration time
        data: payload
    }, process.env.JWT_SECRET_KEY);
};

export const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET_KEY);
};