import crypto from 'crypto';

const iterations = 10000;

export const hashPassword = (password) => {
    const salt = crypto.randomBytes(32);
    const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
    return {
        hash: hash,
        salt: salt.toString('hex')
    };
}

export const verifyPassword = (password, hash, salt) => {
    const newHash = crypto.pbkdf2Sync(password, Buffer.from(salt, 'hex'), iterations, 64, 'sha512').toString('hex');
    return hash === newHash;
}