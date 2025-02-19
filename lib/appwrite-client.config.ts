import { Client, Databases } from 'appwrite'; // Import from 'appwrite', not 'node-appwrite'

const client = new Client(); // Use Client from 'appwrite'

client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PROJECT_ID!);

export const databases = new Databases(client); // Use Databases from 'appwrite'