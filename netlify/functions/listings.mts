import type { Context } from "@netlify/functions";
import { connectDB } from './utils/db.mjs';
import Listing from './models/Listing.mjs';
import { verifyToken } from './utils/auth.mjs';

export default async (req: Request, context: Context) => {
  try {
    await connectDB();
    
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    
    // GET /api/listings - Get all listings
    if (req.method === 'GET' && pathSegments.length === 2) {
      const listings = await Listing.find().populate('vendor', 'name').sort({ createdAt: -1 });
      return new Response(JSON.stringify(listings), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // POST /api/listings - Create new listing (requires auth)
    if (req.method === 'POST' && pathSegments.length === 2) {
      try {
        const user = verifyToken(req.headers.get('authorization'));
        const { title, description, price, location, imageUrl, listingType } = await req.json();
        
        const newListing = new Listing({
          title,
          description,
          price,
          location,
          imageUrl,
          listingType,
          vendor: user.id,
        });

        const listing = await newListing.save();
        return new Response(JSON.stringify(listing), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (authError) {
        return new Response(JSON.stringify({ msg: 'Authorization failed' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ msg: 'Not found' }), {
      status: 404,
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
  path: "/api/listings"
};
