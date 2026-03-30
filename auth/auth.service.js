import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../users/users.repository.js';

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
  if (!existingUser || !existingUser.password_hash) {
    throw new Error('USER_NOT_EXIST');
  }
  const verifyPassword = await bcrypt.compare(password, existingUser.password_hash)
  
  if (!verifyPassword){
    throw new Error('INVALID_PASSWORD');
  }
  return true;
}