import { Account, Client, Databases, Storage } from 'appwrite';

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_DATABASE_ID,
    projectId: import.meta.env.VITE_PROJECT_ID,
    jobCollectionId: import.meta.env.VITE_JOBS_COLLECTION_ID,
    companyCollectionId: import.meta.env.VITE_COMPANY_COLLECTION_ID,
    applyCollectionId: import.meta.env.VITE_APPLY_COLLECTION_ID,
    messageCollectionId: import.meta.env.VITE_MESSAGE_COLLECTION_ID,
    bucketId: import.meta.env.VITE_RESUME_BUCKET,
}
export const client = new Client();
client.setEndpoint(appwriteConfig.url);
// client.setEndpointRealtime('wss://cloud.appwrite.io/v1/realtime');
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);