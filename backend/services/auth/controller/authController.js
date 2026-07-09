import crypto from 'crypto'
import { getAuth } from 'firebase-admin/auth'
import { app } from '../config/firebase.js'
import User from '../models/userModel.js'
import redis from '../../../share/redis/redis.js';

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await getAuth(app).verifyIdToken(token);

    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }

    const sessionId = crypto.randomBytes(32).toString('hex');
    await redis.set(`session:${sessionId}`, JSON.stringify({ userId: user._id ,name: user.name, email: user.email, avatar: user.avatar}),
     'EX', 60 * 60 * 24 * 7);

    res.cookie('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    if (sessionId) {
      await redis.del(`session:${sessionId}`);
      res.clearCookie('session');
    }
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};