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
    
    const { email, password } = await req.json();

    let user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ msg: 'Invalid credentials' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ msg: 'Invalid credentials' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
  path: "/api/auth/login"
};
