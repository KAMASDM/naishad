import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      service_type: searchParams.get('service_type'),
      featured: searchParams.get('featured') === 'true' ? true : undefined,
    };
    
    // Remove undefined values
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
    
    const services = await db.getServices(filters);
    
    return NextResponse.json({
      count: services.length,
      results: services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
