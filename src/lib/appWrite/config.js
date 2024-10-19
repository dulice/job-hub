import { Account, Client, Databases } from 'appwrite';

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_DATABASE_ID,
    projectId: import.meta.env.VITE_PROJECT_ID,
    jobCollectionId: import.meta.env.VITE_JOBS_COLLECTION_ID,
    companyCollectionId: import.meta.env.VITE_COMPANY_COLLECTION_ID,
}
const client = new Client();
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const database = new Databases(client);