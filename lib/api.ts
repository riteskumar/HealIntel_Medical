import {
    APPOINTMENT_COLLECTION_ID,
    PATIENT_COLLECTION_ID,
    DATABASE_ID,
    databases,
    messaging,
  } from "./appwrite.config";
import { Query } from 'node-appwrite';

export async function getPatientByEmail(email: string) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('email', email)]
    );
    return response.documents[0];
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
}

export async function getPatientAppointments(patientId: string) {
  try {
    const response = await databases.listDocuments(
     DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.equal('patient', patientId)]
    );
    return response.documents;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}