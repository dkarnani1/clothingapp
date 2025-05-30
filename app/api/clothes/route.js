import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const clothes = await prisma.clothing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse tags from JSON string back to array
    const clothesWithParsedTags = clothes.map(item => ({
      ...item,
      tags: JSON.parse(item.tags)
    }));

    return NextResponse.json(clothesWithParsedTags);
  } catch (error) {
    console.error('❌ Error fetching clothes:', error);
    return NextResponse.json({ error: 'Failed to fetch clothes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('📝 Received data:', data);

    // Validate required fields
    if (!data.name || !data.brand || !data.size || !data.color || !Array.isArray(data.tags)) {
      console.error('❌ Validation error:', { data });
      return NextResponse.json({ 
        error: 'Missing required fields',
        required: ['name', 'brand', 'size', 'color', 'tags (array)'],
        received: data
      }, { status: 400 });
    }

    // Ensure price is a number if provided
    const formattedData = {
      ...data,
      price: data.price ? parseFloat(data.price) : null,
      tags: JSON.stringify(data.tags)
    };

    console.log('📝 Formatted data:', formattedData);

    const clothing = await prisma.clothing.create({
      data: formattedData
    });

    console.log('✅ Created new clothing item:', clothing);
    
    // Return the same format as GET endpoint with parsed tags
    const responseItem = {
      ...clothing,
      tags: data.tags // Return the original array (already parsed)
    };
    
    return NextResponse.json(responseItem);
  } catch (error) {
    console.error('❌ Error creating clothing:', error);
    return NextResponse.json({ 
      error: 'Failed to create clothing item',
      details: error.message
    }, { status: 500 });
  }
} 