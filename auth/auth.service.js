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