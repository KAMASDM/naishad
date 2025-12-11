import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const cityId = parseInt(params.cityId);
    const areas = await db.getAreas(cityId);
    
    return NextResponse.json(areas);
  } catch (error) {
    console.error('Error fetching areas by city:', error);
    return NextResponse.json(
      { error: 'Failed to fetch areas' },
      { status: 500 }
    );
  }
}
