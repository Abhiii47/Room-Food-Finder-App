import type { Context } from "@netlify/functions";
import { connectDB } from '../utils/db.mjs';
import Listing from '../models/Listing.mjs';
import { verifyToken } from '../utils/auth.mjs';

export default async (req: Request, context: Context) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ msg: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    await connectDB();

    const user = verifyToken(req.headers.get('authorization'));
    const listings = await Listing.find({ vendor: user.id }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(listings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    if (error.message === 'Authorization failed' || error.message.includes('token')) {
      return new Response(JSON.stringify({ msg: 'Authorization failed' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.error(error);
    return new Response(JSON.stringify({ msg: 'Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/listings/my-listings"
};
