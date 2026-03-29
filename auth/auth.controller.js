import { registerUser } from './auth.service.js';

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    const user = await registerUser(email, password);

    res.status(201).json(user);

  } catch (err) {
    if (err.message === 'EMAIL_EXISTS') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
}