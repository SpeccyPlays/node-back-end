import 'dotenv/config';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET_NOT_SET');
}
if (!process.env.LOGIN_EXPIRY){
    throw new Error ('LOGIN_EXPIRY_NOT_SET')
}

export const config = {
  secret: process.env.JWT_SECRET,
  loginExpiry: process.env.LOGIN_EXPIRY
};