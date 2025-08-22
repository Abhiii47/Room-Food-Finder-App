import type { Context } from "@netlify/functions";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '../utils/db.mjs';
import User from '../models/User.mjs';

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ msg: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await connectDB();
    
    const { name, email, password, userType } = await req.json();

    let user = await User.findOne({ email });
    if (user) {
      return new Response(JSON.stringify({ msg: 'User already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    user = new User({ name, email, password, userType });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    
    const token = jwt.sign(
      payload,
      Netlify.env.get('JWT_SECRET') || '',
      { expiresIn: 3600 }
    );

    return new Response(JSON.stringify({ 
      token, 
      user: { name: user.name, userType: user.userType } 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ msg: 'Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/auth/register"
};
