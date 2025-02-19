import { Client, Databases, Users, Storage } from 'node-appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.PROJECT_ID!)
  .setKey(process.env.API_KEY!);

export const databases = new Databases(client);
export const users = new Users(client);
export const storage = new Storage(client);