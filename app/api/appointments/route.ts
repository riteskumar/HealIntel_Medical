import { databases } from '@/lib/appwrite.server';
import { Query } from 'node-appwrite';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');

  if (!patientId) {
    return NextResponse.json({ error: 'Patient ID is required' }, { status: 400 });
  }

  try {
    const response = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      [Query.equal('patient', patientId)]
    );
    
    return NextResponse.json(response.documents);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' }, 
      { status: 500 }
    );
  }
}