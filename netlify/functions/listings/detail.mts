import type { Context } from "@netlify/functions";
import { connectDB } from '../utils/db.mjs';
import Listing from '../models/Listing.mjs';
import { verifyToken } from '../utils/auth.mjs';

export default async (req: Request, context: Context) => {
  try {
    await connectDB();
    
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const listingId = pathSegments[pathSegments.length - 1];

    // GET /api/listings/:id - Get single listing
    if (req.method === 'GET') {
      const listing = await Listing.findById(listingId).populate('vendor', 'name');
      if (!listing) {
        return new Response(JSON.stringify({ msg: 'Listing not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(listing), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // PUT /api/listings/:id - Update listing (requires auth)
    if (req.method === 'PUT') {
      try {
        const user = verifyToken(req.headers.get('authorization'));
        const { title, description, price, imageUrl, listingType } = await req.json();

        let listing = await Listing.findById(listingId);
        if (!listing) {
          return new Response(JSON.stringify({ msg: 'Listing not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        if (listing.vendor.toString() !== user.id) {
          return new Response(JSON.stringify({ msg: 'User not authorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        listing = await Listing.findByIdAndUpdate(
          listingId,
          { $set: { title, description, price, imageUrl, listingType } },
          { new: true }
        );

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
    
    // DELETE /api/listings/:id - Delete listing (requires auth)
    if (req.method === 'DELETE') {
      try {
        const user = verifyToken(req.headers.get('authorization'));

        const listing = await Listing.findById(listingId);
        if (!listing) {
          return new Response(JSON.stringify({ msg: 'Listing not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        if (listing.vendor.toString() !== user.id) {
          return new Response(JSON.stringify({ msg: 'User not authorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        await Listing.findByIdAndDelete(listingId);

        return new Response(JSON.stringify({ msg: 'Listing removed' }), {
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

    return new Response(JSON.stringify({ msg: 'Method not allowed' }), {
      status: 405,
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
  path: "/api/listings/*"
};
