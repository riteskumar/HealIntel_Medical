import { databases } from '@/lib/appwrite.server';
import { Query } from 'node-appwrite';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  console.log('Email:', email);
  try {
    const response = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      [Query.equal('email', email!)]
    );
    return NextResponse.json(response.documents[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch patient' }, { status: 500 });
  }
}