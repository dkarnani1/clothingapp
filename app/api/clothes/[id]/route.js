import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();

    // If updating tags, convert to JSON string
    const updateData = data.tags 
      ? { ...data, tags: JSON.stringify(data.tags) }
      : data;

    const clothing = await prisma.clothing.update({
      where: { id },
      data: updateData
    });
    
    if (!clothing) {
      return NextResponse.json({ error: 'Clothing not found' }, { status: 404 });
    }

    // Parse tags back to array if they exist
    return NextResponse.json({
      ...clothing,
      tags: data.tags ? data.tags : JSON.parse(clothing.tags)
    });
  } catch (error) {
    console.error('❌ Error updating clothing:', error);
    return NextResponse.json({ error: 'Failed to update clothing' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.clothing.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Clothing deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting clothing:', error);
    return NextResponse.json({ error: 'Failed to delete clothing' }, { status: 500 });
  }
} 