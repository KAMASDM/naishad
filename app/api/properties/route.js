import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      property_type: searchParams.get('property_type'),
      bedrooms: searchParams.get('bedrooms'),
      area_name: searchParams.get('area_name'),
      search: searchParams.get('search'),
      featured: searchParams.get('featured') === 'true' ? true : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined,
    };
    
    // Remove undefined values
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
    
    const properties = await db.getProperties(filters);
    
    return NextResponse.json({
      count: properties.length,
      results: properties,
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
