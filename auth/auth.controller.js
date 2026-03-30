import { registerUser, loginUser } from './auth.service.js';

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

export async function login(req, res){
  try {
    const { email, password } = req.body;

    if (!email || !password){
      return res.status(400).json({ error : 'Missing credentials'});
    }
    const result = await loginUser(email, password);

    return res.status(200).json({ message : 'User logged in successfully'});

  } catch (err){
    if (err.message === 'USER_NOT_EXIST' || err.message === 'INVALID_PASSWORD'){
      return res.status(401).json({ error : 'Invalid credentials'});
    }
    res.status(500).json({ error: 'Server error' });
  }
}