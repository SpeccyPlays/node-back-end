import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../users/users.repository.js';
import { config } from '../auth/config.js'

export async function registerUser(email, password) {

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return await createUser(email, passwordHash);
}

export async function loginUser(email, password){
  const existingUser = await findUserByEmail(email);
  if (!existingUser || !existingUser.id || !existingUser.password_hash) {
    throw new Error('USER_NOT_FOUND');
  }
  const verifyPassword = await bcrypt.compare(password, existingUser.password_hash)
  
  if (!verifyPassword){
    throw new Error('INVALID_PASSWORD');
  }
  return generateToken(existingUser.id, existingUser.email);
}
export function generateToken(id, email){
  if (!email){
    throw new Error('INVALID_EMAIL');
  }
  if (!config.secret || !config.loginExpiry){
    throw new Error ('INVALID_CONFIG');
  }
  const payload = {
    "id" : id,
    "email" : email
  }
  return jwt.sign(payload, config.secret, {
    expiresIn: config.loginExpiry
  });
}