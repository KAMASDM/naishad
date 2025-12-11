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
    };
    
    // Remove undefined values
    Object.keys(filters).forEach(key => !filters[key] && delete filters[key]);
    
    const properties = await db.getProperties(filters);
    
    return NextResponse.json({
      count: properties.length,
      results: properties,
    });
  } catch (error) {
    console.error('Error searching properties:', error);
    return NextResponse.json(
      { error: 'Failed to search properties' },
      { status: 500 }
    );
  }
}
